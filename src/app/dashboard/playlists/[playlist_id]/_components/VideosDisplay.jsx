import { auth } from "@utils/auth";
import { getOnePlaylistAndVideosInfo } from "@utils/data";

import { ContentCard, ContentsDisplay } from "@components/Content";

export default async function VideosDisplay({ playlist_id }) {
    const { user_id } = await auth();
    const { videos, ...playlist } = await getOnePlaylistAndVideosInfo(
        user_id,
        playlist_id,
    );

    return (
        <>
            <div className="flex justify-center lg:block mb-6">
                <ContentCard content={playlist} className="bg-info-content" />
            </div>

            <ContentsDisplay contents={videos} parentId={playlist.id} />
        </>
    );
}
