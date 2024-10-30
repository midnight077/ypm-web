"use server";

import { AuthError } from "next-auth";

import { signOut } from "@utils/auth";

export default async function logoutAction() {
    try {
        const urlParams = new URLSearchParams({
            logoutSuccess: "Logged out successfully!",
        });
        await signOut({
            redirectTo: `/?${urlParams.toString()}`,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            console.log(error);
            return {
                errors: {},
                message: "Logout failed! Please inform us if problem persists.",
            };
        }

        throw error;
    }
}
