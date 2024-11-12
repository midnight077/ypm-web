import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
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
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        },
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    userTags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserTag",
        },
    ],
});

export default mongoose.models?.Playlist ||
    mongoose.model("Playlist", playlistSchema);
