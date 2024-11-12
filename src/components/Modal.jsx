"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

export function useModalContext() {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModalContext must be used within a Modal");
    }

    return context;
}

export default function Modal({ id, isOpen, children }) {
    const [isClosable, setIsClosable] = useState(true);

    return (
        <dialog id={id} className={`modal ${isOpen && "modal-open"}`}>
            <div className="modal-box max-w-sm">
                <ModalContext.Provider value={{ isClosable, setIsClosable }}>
                    {children}
                </ModalContext.Provider>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button disabled={!isClosable}>close</button>
            </form>
        </dialog>
    );
}
