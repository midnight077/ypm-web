"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import SmartForm, { useSmartFormContext } from "@components/SmartForm";

import loginAction from "../_actions/loginAction";

export default function SmartLoginForm() {
    return (
        <SmartForm serverAction={loginAction}>
            <LoginForm />
        </SmartForm>
    );
}

function LoginForm() {
    const { isProcessing } = useSmartFormContext();

    return (
        <div className="form-control">
            <button
                type="submit"
                className="btn btn-primary"
                disabled={isProcessing}
            >
                {isProcessing ? (
                    <span className="loading loading-dots loading-xs"></span>
                ) : (
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                )}

                <span>Login With Google</span>
            </button>
        </div>
    );
}
