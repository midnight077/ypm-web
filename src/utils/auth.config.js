import Google from "next-auth/providers/google";

/** @type {import("next-auth").NextAuthConfig} */
export default {
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
            }

            if (Date.now() >= token.expires_at * 1000) {
                token.error = "AccessTokenExpired";
            }

            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user_id = token.sub;
            session.error = token.error;

            return session;
        },
    },
};
