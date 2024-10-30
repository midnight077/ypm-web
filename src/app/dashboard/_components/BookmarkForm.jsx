import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

export default function BookmarkForm() {
    return (
        <form
            action={async (formData) => {
                "use server";
                console.log(formData);
            }}
        >
            <div className="form-control mt-4">
                <input
                    type="url"
                    name="url"
                    placeholder="Paste YouTube Playlist URL here..."
                    required
                    className="input input-bordered"
                />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-6">
                <FontAwesomeIcon icon={faBookmark} />
                Add Playlist
            </button>
        </form>
    );
}
