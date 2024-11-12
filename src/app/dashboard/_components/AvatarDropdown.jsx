"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import SmartLogoutForm from "./SmartLogoutForm";

export default function AvatarDropdown() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState({ name: "", email: "", image: null });
    const router = useRouter();

    useEffect(() => {
        if (session?.error) {
            const urlParams = new URLSearchParams({
                sessionError: "Session expired! Please login again.",
            });
            signOut({ redirectTo: `/?${urlParams.toString()}` });
        }
    }, [session?.error]);

    useEffect(() => {
        if (status === "authenticated") {
            setUser(session.user);
        } else if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status]);

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className={`btn btn-ghost btn-circle avatar ${!user.image && "placeholder"}`}
            >
                <div
                    className={`w-10 h-10 rounded-full relative ${status === "authenticated" ? !user.image && "bg-neutral text-neutral-content" : "skeleton"}`}
                >
                    {user.image ? (
                        <Image
                            alt={user.name}
                            src={user.image}
                            fill
                            sizes="96px"
                            priority
                            quality={100}
                        />
                    ) : (
                        <span className="text-3xl-">
                            {user.name
                                .split(" ")
                                .map((s, i, arr) =>
                                    i === 0 || i === arr.length - 1 ? s[0] : "",
                                )
                                .join("")}
                        </span>
                    )}
                </div>
            </div>

            {status === "authenticated" && (
                <div
                    tabIndex={0}
                    className="dropdown-content card card-compact bg-base-100 z-[1] mt-3 min-w-52 shadow-2xl"
                >
                    <div className="card-body">
                        <span className="font-bold">{user.name}</span>
                        <span>{user.email}</span>

                        <SmartLogoutForm />
                    </div>
                </div>
            )}
        </div>
    );
}
