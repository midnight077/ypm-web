import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: String,
    playlists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Playlist",
        },
    ],
});

export default mongoose.models?.User || mongoose.model("User", userSchema);
