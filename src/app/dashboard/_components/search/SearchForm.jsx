"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

export default function SearchForm() {
    const [searchType, setSearchType] = useState("tag");
    const [tags, setTags] = useState([]);
    const [query, setQuery] = useState("");
    const [suggestedTags, setSuggestedTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setTags([
                "Education",
                "Music",
                "Sports",
                "News",
                "Entertainment",
                "Technology",
                "Health",
                "Gaming",
                "Cooking",
                "Travel",
            ]);
        }, 3000);
    }, []);

    useEffect(() => {
        if (searchType === "tag" && query) {
            setSuggestedTags(
                tags
                    .filter((tag) => !selectedTags.includes(tag))
                    .map((tag) => [...tag.matchAll(new RegExp(query, "gi"))])
                    .filter((matches) => matches.length > 0)
                    .map((matches) => {
                        const subRank = matches.reduce(
                            (indexSum, match) => (indexSum += match.index),
                            0,
                        );
                        return {
                            tag: matches[0].input,
                            rank: matches.length,
                            subRank,
                        };
                    })
                    .sort((a, b) =>
                        a.rank === b.rank
                            ? a.subRank - b.subRank
                            : b.rank - a.rank,
                    )
                    .map((sorted) => sorted.tag)
                    .slice(0, 10),
            );
        } else {
            setSuggestedTags([]);
        }
    }, [tags, query, selectedTags]);

    return (
        <form>
            <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                required
                className="select select-bordered w-full"
            >
                <option value="tag">Search by Tag</option>
                <option value="general">General Search</option>
            </select>

            <div className="form-control mt-4">
                <input
                    type="text"
                    value={query}
                    placeholder={`Type your ${searchType === "tag" ? "tag" : "search query"} here...`}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                    className="input input-bordered"
                />

                <label className="label">
                    <span className="label-text-alt"></span>
                    <span
                        onClick={() => {
                            setQuery("");
                            setSelectedTags([]);
                        }}
                        className="label-text-alt link"
                    >
                        Reset
                    </span>
                </label>
            </div>

            {searchType === "tag" && (query || selectedTags.length > 0) && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTags.map((tag, index) => (
                        <p
                            key={index}
                            onClick={() => {
                                setSelectedTags(
                                    selectedTags.filter((t) => t !== tag),
                                );
                            }}
                            className="badge cursor-pointer badge-secondary"
                        >
                            <FontAwesomeIcon
                                icon={faMinus}
                                size="xs"
                                className="text-gray-500 mr-2 mt-[1px]"
                            />
                            {tag}
                        </p>
                    ))}

                    {suggestedTags.map((tag, index) => (
                        <p
                            key={index}
                            onClick={() => {
                                setSelectedTags([...selectedTags, tag]);
                            }}
                            className="badge cursor-pointer"
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                size="xs"
                                className="text-gray-500 mr-2 mt-[1px]"
                            />
                            {tag}
                        </p>
                    ))}
                </div>
            )}

            <button type="submit" className="btn btn-primary w-full mt-6">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                Search
            </button>
        </form>
    );
}
