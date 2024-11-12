import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "@utils/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isServerAction = req.headers.get("next-action");
    if (isServerAction) {
        return NextResponse.next();
    }

    const { nextUrl } = req;
    const { pathname } = nextUrl;

    const isProtectedRoute = pathname.startsWith("/dashboard");
    const isAuthRoute = pathname === "/";

    const isAuthenticated = req.auth && !req.auth.error;

    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|media|fonts|favicon.ico|favicon.png|sitemap.xml|robots.txt).*)",
    ],
};
