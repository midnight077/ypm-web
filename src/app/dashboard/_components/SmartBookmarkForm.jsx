"use client";

import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import SmartForm, { useSmartFormContext } from "@components/SmartForm";
import { useModalContext } from "@components/Modal";

import bookmarkSchema from "../_formSchemas/bookmarkSchema";
import bookmarkAction from "../_actions/bookmarkAction";

export default function SmartBookmarkForm() {
    return (
        <SmartForm
            initialValues={{ url: "" }}
            formSchema={bookmarkSchema}
            serverAction={bookmarkAction}
        >
            <BookmarkForm />
        </SmartForm>
    );
}

function BookmarkForm() {
    const { values, errors, isValid, isProcessing, handleChange } =
        useSmartFormContext();
    const { setIsClosable } = useModalContext();

    useEffect(() => {
        setIsClosable(!isProcessing);
    }, [isProcessing]);

    return (
        <>
            <div className="form-control">
                <div className="label">
                    <span className="label-text">
                        Youtube Playlist URL{" "}
                        <span className="text-primary">*</span>
                    </span>
                </div>

                <input
                    type="url"
                    name="url"
                    placeholder="https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"
                    required
                    disabled={isProcessing}
                    value={values.url}
                    onChange={(e) => handleChange("url", e.target.value)}
                    onFocus={(e) => e.target.select()}
                    className={`input input-bordered ${errors.url && "input-error"}`}
                />

                <div className="label">
                    {errors.url ? (
                        <span className="label-text-alt text-error">
                            {errors.url}
                        </span>
                    ) : (
                        <span className="label-text-alt text-gray-400">
                            Type/paste a valid URL
                        </span>
                    )}
                </div>
            </div>

            <div className="form-control mt-4">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid || isProcessing}
                >
                    {isProcessing ? (
                        <span className="loading loading-dots loading-xs"></span>
                    ) : (
                        <FontAwesomeIcon icon={faBookmark} />
                    )}

                    <span>Add Playlist</span>
                </button>
            </div>
        </>
    );
}
