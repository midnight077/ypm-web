"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { useRouter } from "next/navigation";

import { z } from "zod";
import toast from "react-hot-toast/headless";

import { issuesToErrors } from "@utils/zod";

const SmartFormContext = createContext(null);

export function useSmartFormContext() {
    const context = useContext(SmartFormContext);

    if (!context) {
        throw new Error("useSmartFormContext must be used within a SmartForm");
    }

    return context;
}

export default function SmartForm({
    formSchema,
    initialValues = {},
    serverAction,
    children,
    className,
}) {
    const router = useRouter();

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [errors]);

    function FormStatusSynchroniser() {
        const { pending } = useFormStatus();

        useEffect(() => {
            setIsProcessing(pending);
        }, [pending]);

        return null;
    }

    async function clientAction(formData) {
        const rawFormData = Object.fromEntries(formData);
        let validatedData = null;

        if (formSchema) {
            const clientValidation = formSchema.safeParse(rawFormData);

            if (!clientValidation.success) {
                const issues = clientValidation.error.errors;
                const errors = issuesToErrors(issues);

                setErrors(errors);
                toast.error("Invalid form data!");
                return;
            }

            validatedData = clientValidation.data;
        }

        if (serverAction) {
            const response = await serverAction(validatedData || rawFormData);

            if (!response) {
                return;
            }

            if (response.success) {
                setValues(initialValues);
                if (response.message) {
                    toast.success(response.message);
                }
            } else if (response.errors) {
                setErrors(response.errors);
                if (response.message) {
                    toast.error(response.message);
                }
            } else {
                if (response.message) {
                    toast(response.message);
                }
            }

            if (response.redirect) {
                router.push(response.redirect);
            } else if (response.data) {
                return response.data;
            }
        }
    }

    function handleChange(name, value) {
        if (!formSchema) {
            return;
        }

        const { shape } = formSchema;
        const InputSchema = z.object({ [name]: shape[name] });
        const inputValidation = InputSchema.safeParse({ [name]: value });

        if (value && !inputValidation.success) {
            const issues = inputValidation.error.errors;
            const errors = issuesToErrors(issues);

            setErrors((prevErrors) => {
                return { ...prevErrors, ...errors };
            });
        } else {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    }

    return (
        <SmartFormContext.Provider
            value={{
                values,
                errors,
                isValid,
                isProcessing,
                handleChange,
            }}
        >
            <form action={clientAction} className={className}>
                <FormStatusSynchroniser />

                {children}
            </form>
        </SmartFormContext.Provider>
    );
}
