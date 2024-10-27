"use client";

import { useEffect } from "react";

import toast from "react-hot-toast/headless";

import useExtractUrlParams from "@hooks/useExtractUrlParams";

const notifyTypeFunctionMap = {
    success: toast.success,
    error: toast.error,
    info: toast,
};

export default function NotifyFromUrlParams({ paramNameNotifyTypeMap }) {
    const paramNames = Object.keys(paramNameNotifyTypeMap);
    const paramNameValueMap = useExtractUrlParams(paramNames);

    useEffect(() => {
        paramNames.forEach((paramName) => {
            const paramValue = paramNameValueMap[paramName];

            if (paramValue) {
                const notifyType = paramNameNotifyTypeMap[paramName];
                const notifyFunction = notifyTypeFunctionMap[notifyType];

                if (paramName === "error") {
                    switch (paramValue) {
                        case "OAuthCallbackError":
                            notifyFunction("Not authenticated!");
                            break;

                        case "Configuration":
                            notifyFunction(
                                "Could not initiate authentication!",
                            );
                            break;

                        default:
                            notifyFunction("Something went wrong!");
                            break;
                    }
                } else {
                    notifyFunction(paramValue);
                }
            }
        });
    }, [paramNameValueMap]);

    return null;
}
