"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useExtractUrlParams(paramNames, removeFromUrl = true) {
    const urlPath = usePathname();
    const urlParams = useSearchParams();
    const router = useRouter();

    const [extractedParamNameValueMap, setExtractedParamNameValueMap] =
        useState({});

    useEffect(() => {
        const urlParamNameValueMap = Object.fromEntries(urlParams);

        setExtractedParamNameValueMap(
            paramNames.reduce((paramNameValueMap, paramName) => {
                paramNameValueMap[paramName] = urlParamNameValueMap[paramName];
                return paramNameValueMap;
            }, {}),
        );

        if (removeFromUrl) {
            paramNames.forEach((paramName) => {
                delete urlParamNameValueMap[paramName];
            });

            const newUrlParams = new URLSearchParams(urlParamNameValueMap);

            router.replace(`${urlPath}?${newUrlParams.toString()}`);
        }
    }, []);

    return extractedParamNameValueMap;
}
