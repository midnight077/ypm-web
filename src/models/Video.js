import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    thumbnailBuffer: Buffer,
    thumbnailType: String,
    position: {
        type: Number,
        required: true,
    },
    playlists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Playlist",
        },
    ],
    userTags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserTag",
        },
    ],
});

export default mongoose.models?.Video || mongoose.model("Video", videoSchema);
