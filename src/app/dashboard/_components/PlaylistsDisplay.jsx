import { auth } from "@utils/auth";
import { getAllPlaylistsInfo } from "@utils/data";

import { ContentsDisplay } from "@components/Content";

export default async function PlaylistsDisplay() {
    const { user_id } = await auth();
    const playlists = await getAllPlaylistsInfo(user_id);

    return <ContentsDisplay contents={playlists} />;
}
