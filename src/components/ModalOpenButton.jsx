"use client";

export default function ModalOpenButton({ modalId, children, className }) {
    return (
        <button
            className={`${className} btn`}
            onClick={() => document.getElementById(modalId).showModal()}
        >
            {children}
        </button>
    );
}
