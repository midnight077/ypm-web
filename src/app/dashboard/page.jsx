import { Suspense } from "react";

import NotifyFromUrlParams from "@components/NotifyFromUrlParams";

export default async function DashboardPage() {
    return (
        <>
            <Suspense>
                <NotifyFromUrlParams
                    paramNameNotifyTypeMap={{ loginSuccess: "success" }}
                />
            </Suspense>

            <div className="bg-base-100">hi there</div>
        </>
    );
}
