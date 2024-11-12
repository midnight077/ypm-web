import { auth } from "@utils/auth";
import { getAllPlaylistsInfo } from "@utils/data";

import { ContentsDisplay } from "@components/Content";

export default async function PlaylistsDisplay() {
    const { userId } = await auth();
    const playlists = await getAllPlaylistsInfo(userId);

    return <ContentsDisplay contents={playlists} />;
}
