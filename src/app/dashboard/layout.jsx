import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightToBracket,
    faBookmark,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import ModalOpenButton from "./_components/ModalOpenButton";
import SearchForm from "./_components/SearchForm";
import BookmarkForm from "./_components/BookmarkForm";

import { signOut } from "@utils/auth";

export default function DashboardLayout({ children }) {
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

                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/" });
                        }}
                    >
                        <button type="submit" className="btn btn-primary">
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                            <span className="hidden sm:inline-block">
                                Logout
                            </span>
                        </button>
                    </form>
                </div>
            </nav>

            <div>{children}</div>
        </div>
    );
}
