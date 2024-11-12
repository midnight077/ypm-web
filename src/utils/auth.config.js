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
};
