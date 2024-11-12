import Modal from "@components/Modal";

import SearchForm from "./SearchForm";
import SmartBookmarkForm from "./SmartBookmarkForm";

export default function Modals() {
    return (
        <div>
            <Modal id="search_modal">
                <SearchForm />
            </Modal>

            <Modal id="bookmark_modal">
                <SmartBookmarkForm />
            </Modal>
        </div>
    );
}
