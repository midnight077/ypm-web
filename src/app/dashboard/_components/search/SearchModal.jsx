import SearchForm from "./SearchForm";

export default function SearchModal() {
    return (
        <dialog id="search_modal" className="modal">
            <div className="modal-box max-w-sm">
                <SearchForm />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
