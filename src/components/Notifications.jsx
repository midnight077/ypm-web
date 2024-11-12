"use client";

import { useToaster } from "react-hot-toast/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Notifications() {
    const { toasts, handlers } = useToaster({
        duration: 3 * 1000,
        className: "alert-info",
        icon: faInfo,
        success: { className: "alert-success", icon: faCheck },
        error: { className: "alert-error", icon: faXmark },
    });
    const { startPause, endPause } = handlers;

    return (
        <div
            onMouseEnter={startPause}
            onMouseLeave={endPause}
            className="toast toast-top toast-center z-[60]"
        >
            {toasts
                .filter((toast) => toast.visible)
                .map((toast) => (
                    <div
                        key={toast.id}
                        className={`alert shadow-2xl ${toast.className}`}
                        {...toast.ariaProps}
                    >
                        <FontAwesomeIcon fixedWidth icon={toast.icon} />
                        <span>{toast.message}</span>
                    </div>
                ))}
        </div>
    );
}
