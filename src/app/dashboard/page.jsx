import { redirect } from "next/navigation";

import { auth } from "@utils/auth";

export default async function DashboardPage() {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/");
    }

    return <div className="bg-base-100">hi there</div>;
}
