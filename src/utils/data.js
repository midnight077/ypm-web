import mongoose from "mongoose";

import db from "@utils/db";
import { limitStr } from "@utils/others";

import { User, Playlist, Video } from "@models/index";

export async function bookmarkPLaylist(
    user_id,
    playlistInfo,
    playlistVideosInfo,
) {
    await db.connect();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const playlist = await Playlist.findOneAndUpdate(
            { id: playlistInfo.id },
            { $set: playlistInfo, $addToSet: { users: user_id } },
            { upsert: true, new: true, session },
        ).select("_id");

        await User.updateOne(
            { _id: user_id },
            { $addToSet: { playlists: playlist._id } },
            { session },
        );

        const videoBulkOps = [];

        playlistVideosInfo.forEach((playlistVideoInfo) => {
            videoBulkOps.push({
                updateOne: {
                    filter: { id: playlistVideoInfo.id },
                    update: {
                        $set: playlistVideoInfo,
                        $addToSet: { playlists: playlist._id },
                    },
                    upsert: true,
                },
            });
        });

        if (videoBulkOps.length > 0) {
            const videoBulkOpsResult = await Video.bulkWrite(videoBulkOps, {
                session,
            });

            const { upsertedCount, upsertedIds } = videoBulkOpsResult;

            if (upsertedCount > 0) {
                await playlist.updateOne(
                    {
                        $addToSet: {
                            videos: { $each: Object.values(upsertedIds) },
                        },
                    },
                    { session },
                );
            }
        }

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
}

export async function getAllPlaylistsInfo(user_id) {
    await db.connect();

    const user = await User.findById(user_id)
        .select("playlists")
        .populate({
            path: "playlists",
            select: "_id id title description thumbnailUrl thumbnailBuffer thumbnailType userTags",
            populate: {
                path: "userTags",
                match: { user: user_id },
                select: "tags",
            },
        });

    const playlistsWithUserTags = user.playlists.map((playlist) => {
        return {
            _id: playlist._id.toString(),
            id: playlist.id,
            title: playlist.title,
            description: limitStr(playlist.description),
            thumbnailUrl: playlist.thumbnailUrl,
            thumbnailBuffer: playlist.thumbnailBuffer,
            thumbnailType: playlist.thumbnailType,
            tags: playlist.userTags[0]?.tags || [],
        };
    });

    return playlistsWithUserTags;
}

export async function addExtraThumbnailInfo(playlistInfo, playlistVideosInfo) {
    async function addThumbnailBufferAndType(content) {
        if (!content.thumbnailUrl.startsWith("https://i.ytimg.com/vi")) {
            const response = await fetch(content.thumbnailUrl);

            if (response.ok) {
                const imageArrayBuffer = await response.arrayBuffer();

                content.thumbnailBuffer = Buffer.from(imageArrayBuffer);
                content.thumbnailType = response.headers.get("Content-Type");
            }
        }
    }

    await addThumbnailBufferAndType(playlistInfo);

    for (let i = 0; i < playlistVideosInfo.length; i++) {
        await addThumbnailBufferAndType(playlistVideosInfo[i]);
    }
}

export async function getOnePlaylistAndVideosInfo(user_id, playlist_id) {
    await db.connect();

    const playlist = await Playlist.findOne({
        _id: playlist_id,
        users: user_id,
    })
        .select(
            "_id id title description thumbnailUrl thumbnailBuffer thumbnailType userTags videos",
        )
        .populate([
            {
                path: "userTags",
                match: { user: user_id },
                select: "tags",
            },
            {
                path: "videos",
                select: "_id id title description thumbnailUrl thumbnailBuffer thumbnailType userTags position",
                options: { sort: { position: 1 } },
                populate: {
                    path: "userTags",
                    match: { user: user_id },
                    select: "tags",
                },
            },
        ]);

    if (!playlist) {
        throw new Error("No such playlist bookmarked!");
    }

    return {
        _id: playlist._id.toString(),
        id: playlist.id,
        title: playlist.title,
        description: limitStr(playlist.description),
        thumbnailUrl: playlist.thumbnailUrl,
        thumbnailBuffer: playlist.thumbnailBuffer,
        thumbnailType: playlist.thumbnailType,
        tags: playlist.userTags[0]?.tags || [],
        videos: playlist.videos.map((video) => {
            return {
                _id: video._id.toString(),
                id: video.id,
                title: video.title,
                description: limitStr(video.description),
                thumbnailUrl: video.thumbnailUrl,
                thumbnailBuffer: video.thumbnailBuffer,
                thumbnailType: video.thumbnailType,
                tags: video.userTags[0]?.tags || [],
                position: video.position,
            };
        }),
    };
}
