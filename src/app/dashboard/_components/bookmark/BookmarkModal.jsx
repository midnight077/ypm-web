import BookmarkForm from "./BookmarkForm";

export default function BookmarkModal() {
    return (
        <dialog id="bookmark_modal" className="modal">
            <div className="modal-box max-w-sm">
                <BookmarkForm />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
