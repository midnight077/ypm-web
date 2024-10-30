"use server";

import { AuthError } from "next-auth";

import { signIn } from "@utils/auth";

export default async function loginAction() {
    try {
        const urlParams = new URLSearchParams({
            loginSuccess: "Logged in successfully!",
        });
        await signIn("google", {
            redirectTo: `/dashboard?${urlParams.toString()}`,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            console.log(error);
            return {
                errors: {},
                message: "Login failed! Please inform us if problem persists.",
            };
        }

        throw error;
    }
}
