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
                notifyFunction(paramValue);
            }
        });
    }, [paramNameValueMap]);

    return null;
}
