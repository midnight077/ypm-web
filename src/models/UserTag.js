import mongoose from "mongoose";

const userTagSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    taggableDoc: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "taggableDocModel",
        required: true,
    },
    taggableDocModel: {
        type: String,
        enum: ["Playlist", "Video"],
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
});

export default mongoose.models?.UserTag ||
    mongoose.model("UserTag", userTagSchema);
