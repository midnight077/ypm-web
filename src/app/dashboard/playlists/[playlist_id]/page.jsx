import { Suspense } from "react";

import { ContentsDisplaySkeleton } from "@components/Content";

import VideosDisplay from "./_components/VideosDisplay";

export default function PlaylistPage({ params }) {
    const { playlist_id } = params;

    return (
        <Suspense fallback={ContentsDisplaySkeleton()}>
            <VideosDisplay playlist_id={playlist_id} />
        </Suspense>
    );
}
