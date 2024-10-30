"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import SmartForm, { useSmartFormContext } from "@components/SmartForm";

import logoutAction from "../_actions/logoutAction";

export default function SmartLogoutForm() {
    return (
        <SmartForm serverAction={logoutAction} className="card-actions mt-2">
            <LogoutForm />
        </SmartForm>
    );
}

function LogoutForm() {
    const { isProcessing } = useSmartFormContext();

    return (
        <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isProcessing}
        >
            {isProcessing ? (
                <span className="loading loading-dots loading-xs"></span>
            ) : (
                <FontAwesomeIcon icon={faArrowRightToBracket} />
            )}

            <span>Logout</span>
        </button>
    );
}
