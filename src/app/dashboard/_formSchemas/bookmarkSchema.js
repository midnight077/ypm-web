import { z } from "zod";

const bookmarkSchema = z.object({
    url: z
        .string()
        .trim()
        .refine((url) => {
            const youtubePlaylistRegex =
                /^https:\/\/(www\.)?youtube\.com\/playlist(\/)?\?list=[a-zA-Z0-9_-]{34}$/;
            return youtubePlaylistRegex.test(url);
        }, "Invalid YouTube playlist URL"),
});

export default bookmarkSchema;
