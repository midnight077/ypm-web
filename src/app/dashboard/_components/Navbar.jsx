import Link from "next/link";

import { SessionProvider } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookmark,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import ModalOpenButton from "@components/ModalOpenButton";

import AvatarDropdown from "./AvatarDropdown";

export default function Navbar() {
    return (
        <nav className="navbar bg-base-100 glass rounded-box shadow-lg sticky top-6">
            <div className="navbar-start">
                <Link href="/dashboard" className="text-xl font-bold px-4">
                    YPM
                </Link>
            </div>

            <div className="navbar-center"></div>

            <div className="navbar-end">
                <ModalOpenButton modalId="search_modal" className="btn-ghost">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span className="hidden sm:inline-block">Search</span>
                </ModalOpenButton>

                <ModalOpenButton modalId="bookmark_modal" className="btn-ghost">
                    <FontAwesomeIcon icon={faBookmark} />
                    <span className="hidden sm:inline-block">Add Playlist</span>
                </ModalOpenButton>

                <SessionProvider>
                    <AvatarDropdown />
                </SessionProvider>
            </div>
        </nav>
    );
}
