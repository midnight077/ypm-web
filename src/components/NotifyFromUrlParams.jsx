"use client";

import { useEffect } from "react";

import useExtractUrlParams from "@hooks/useExtractUrlParams";

import notify from "@utils/notify";

export default function NotifyFromUrlParams({ paramNameNotifyTypeMap }) {
    const paramNames = Object.keys(paramNameNotifyTypeMap);
    const paramNameValueMap = useExtractUrlParams(paramNames);

    useEffect(() => {
        paramNames.forEach((paramName) => {
            const paramValue = paramNameValueMap[paramName];

            if (paramValue) {
                const notifyType = paramNameNotifyTypeMap[paramName];

                if (paramName === "error") {
                    switch (paramValue) {
                        case "OAuthCallbackError":
                            notify(notifyType, "Not authenticated!");
                            break;

                        case "Configuration":
                            notify(
                                notifyType,
                                "Could not initiate authentication!",
                            );
                            break;

                        default:
                            notify(notifyType, "Something went wrong!");
                            break;
                    }
                } else {
                    notify(notifyType, paramValue);
                }
            }
        });
    }, [paramNameValueMap]);

    return null;
}
