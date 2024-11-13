"use server";

import { revalidatePath } from "next/cache";

import { validateData } from "@utils/zod";
import { getPlaylistInfo, getPlaylistVideosInfo } from "@utils/youtube";
import { auth } from "@utils/auth";
import { addExtraThumbnailInfo, bookmarkPLaylist } from "@utils/data";

import bookmarkSchema from "../_formSchemas/bookmarkSchema";

export default async function bookmarkAction(formData) {
    const { errors, data } = validateData(bookmarkSchema, formData);

    if (errors) {
        return {
            errors,
            message: "Invalid form data!",
        };
    }

    const url = new URL(data.url);
    const playlistUrlId = url.searchParams.get("list");

    try {
        const playlistInfo = await getPlaylistInfo(playlistUrlId);
        const playlistVideosInfo = await getPlaylistVideosInfo(playlistUrlId);

        await addExtraThumbnailInfo(playlistInfo, playlistVideosInfo);

        const { user_id } = await auth();

        await bookmarkPLaylist(user_id, playlistInfo, playlistVideosInfo);

        revalidatePath("/dashboard");

        return {
            success: true,
            message: "Playlist bookmarked/updated!",
        };
    } catch (error) {
        console.log(error);
        return {
            errors: {},
            message: "Internal server error!",
        };
    }
}
