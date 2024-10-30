export default function Modal({ id, isOpen, children }) {
    return (
        <dialog id={id} className={`modal ${isOpen && "modal-open"}`}>
            <div className="modal-box max-w-sm">{children}</div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
