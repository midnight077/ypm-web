import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import db from "@utils/db";
import { User } from "@models/index";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/",
        error: "/",
    },
    providers: [
        Google({
            authorization: {
                params: {
                    scope: "email profile openid https://www.googleapis.com/auth/youtube.readonly",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.expires_at = account.expires_at;

                await db.connect();

                const user = await User.findOneAndUpdate(
                    { email: token.email },
                    { name: token.name, image: token.picture },
                    { upsert: true, new: true },
                ).select("_id");

                token.userId = user._id;
            }

            if (Date.now() >= token.expires_at * 1000) {
                token.error = "AccessTokenExpired";
            }

            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.userId = token.userId;
            session.error = token.error;

            return session;
        },
    },
});
