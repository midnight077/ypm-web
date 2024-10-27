import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/",
        error: "/",
    },
    providers: [Google],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.expires_at = account.expires_at;
            }

            if (Date.now() >= token.expires_at * 1000) {
                token.error = "AccesTokenExpired";
            }

            return token;
        },
        async session({ session, token }) {
            session.error = token.error;

            return session;
        },
    },
});
