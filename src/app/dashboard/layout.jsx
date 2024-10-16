import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightToBracket,
    faBookmark,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import ModalOpenButton from "./_components/ModalOpenButton";
import SearchForm from "./_components/SearchForm";
import BookmarkForm from "./_components/BookmarkForm";

import { auth, signOut } from "@utils/auth";

export default async function DashboardLayout({ children }) {
    const session = await auth();
    const user = session.user;

    return (
        <div className="px-6 md:px-16 py-6 flex flex-col gap-6 relative">
            <nav className="navbar bg-base-100 glass rounded-box shadow-lg sticky top-6">
                <div className="navbar-start">
                    <Link href="/" className="text-xl font-bold px-4">
                        YPM
                    </Link>
                </div>

                <div className="navbar-center"></div>

                <div className="navbar-end">
                    <ModalOpenButton
                        modalId="search_modal"
                        className="btn-ghost"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <span className="hidden sm:inline-block">Search</span>
                    </ModalOpenButton>

                    <dialog id="search_modal" className="modal">
                        <div className="modal-box max-w-sm">
                            <SearchForm />
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

                    <ModalOpenButton
                        modalId="bookmark_modal"
                        className="btn-ghost"
                    >
                        <FontAwesomeIcon icon={faBookmark} />
                        <span className="hidden sm:inline-block">
                            Add Playlist
                        </span>
                    </ModalOpenButton>

                    <dialog id="bookmark_modal" className="modal">
                        <div className="modal-box max-w-sm">
                            <BookmarkForm />
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>

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
                                                i === 0 || i === arr.length - 1
                                                    ? s[0]
                                                    : "",
                                            )
                                            .join("")}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div
                            tabIndex={0}
                            className="dropdown-content card card-compact bg-base-100 z-[1] mt-3 min-w-52 shadow"
                        >
                            <div className="card-body">
                                <span className="font-bold">{user.name}</span>
                                <span>{user.email}</span>
                                <form
                                    action={async () => {
                                        "use server";
                                        await signOut({ redirectTo: "/" });
                                    }}
                                    className="card-actions mt-2"
                                >
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                    >
                                        <FontAwesomeIcon
                                            icon={faArrowRightToBracket}
                                        />
                                        <span>Logout</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div>{children}</div>
        </div>
    );
}
