import Modal from "@components/Modal";

import SearchForm from "./SearchForm";
import BookmarkForm from "./BookmarkForm";

export default function Modals() {
    return (
        <div>
            <Modal id="search_modal">
                <SearchForm />
            </Modal>

            <Modal id="bookmark_modal">
                <BookmarkForm />
            </Modal>
        </div>
    );
}
