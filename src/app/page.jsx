import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { signIn } from "@utils/auth";

export default async function HomePage() {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <div>
                            <p className="text-lg pb-2">Welcome To</p>
                            <h1 className="text-4xl font-bold">
                                YouTube Playlist Manager
                            </h1>
                            <div className="prose">
                                <ul className="list-disc py-4">
                                    <li>Bookmark YouTube playlists</li>
                                    <li>Add tags to playlists and videos</li>
                                    <li>Sort and search by tags</li>
                                </ul>
                            </div>
                        </div>

                        <form
                            action={async () => {
                                "use server";
                                await signIn("google", {
                                    redirectTo: "/dashboard",
                                });
                            }}
                        >
                            <div className="form-control">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    <FontAwesomeIcon
                                        icon={faArrowRightToBracket}
                                    />
                                    Login With Google
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
