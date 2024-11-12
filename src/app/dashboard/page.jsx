import { Suspense } from "react";

import NotifyFromUrlParams from "@components/NotifyFromUrlParams";
import { ContentsDisplaySkeleton } from "@components/Content";

import PlaylistsDisplay from "./_components/PlaylistsDisplay";

export default async function DashboardPage() {
    return (
        <>
            <Suspense>
                <NotifyFromUrlParams
                    paramNameNotifyTypeMap={{ loginSuccess: "success" }}
                />
            </Suspense>

            <Suspense fallback={ContentsDisplaySkeleton()}>
                <PlaylistsDisplay />
            </Suspense>
        </>
    );
}
