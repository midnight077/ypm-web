"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { useRouter } from "next/navigation";

import { validateData, extractSchema } from "@utils/zod";
import notify from "@utils/notify";

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
            const { errors, data } = validateData(formSchema, rawFormData);

            if (errors) {
                setErrors(errors);
                notify("error", "Invalid form data!");
                return;
            }

            validatedData = data;
        }

        if (serverAction) {
            const response = await serverAction(validatedData || rawFormData);

            if (!response) {
                return;
            }

            if (response.success) {
                setValues(initialValues);
                if (response.message) {
                    notify("success", response.message);
                }
            } else if (response.errors) {
                setErrors(response.errors);
                if (response.message) {
                    notify("error", response.message);
                }
            } else {
                if (response.message) {
                    notify("info", response.message);
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
        setValues({ ...values, [name]: value });

        if (!formSchema) {
            return;
        }

        const inputSchema = extractSchema(formSchema, name);
        const inputData = { [name]: value };

        const { errors } = validateData(inputSchema, inputData);

        if (value && errors) {
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
