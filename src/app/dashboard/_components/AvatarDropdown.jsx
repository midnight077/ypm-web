"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function AvatarDropdown({ logoutAction }) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState({ name: "", email: "", image: null });
    const router = useRouter();

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
                    className={`w-10 h-10 rounded-full relative ${!user.image && "bg-neutral text-neutral-content"}`}
                >
                    {user.image ? (
                        <Image
                            alt={user.name}
                            src={user.image}
                            fill
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
                        <form
                            action={logoutAction}
                            className="card-actions mt-2"
                        >
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                <FontAwesomeIcon icon={faArrowRightToBracket} />
                                <span>Logout</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
