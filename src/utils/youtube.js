import { auth } from "@utils/auth";

function getData(response, responseSchema) {
    function getFlatItem(item, itemSchema) {
        return Object.keys(itemSchema).reduce((obj, key) => {
            if (typeof itemSchema[key] === "boolean") {
                return { ...obj, [key]: item[key] };
            }

            if (typeof itemSchema[key] === "string") {
                return { ...obj, [itemSchema[key]]: item[key] };
            }

            if (typeof itemSchema[key] === "object") {
                return { ...obj, ...getFlatItem(item[key], itemSchema[key]) };
            }

            return obj;
        }, {});
    }

    return response.items.map((item) =>
        getFlatItem(item, responseSchema.items),
    );
}

function formQueryStr(responseSchema, additionalParams) {
    function formPartStr(responseSchema) {
        return Object.keys(responseSchema["items"]).reduce((str, key) => {
            if (str.length === 0) {
                return key;
            }
            return `${str},${key}`;
        }, "");
    }

    function formFieldsStr(responseSchema) {
        return Object.keys(responseSchema).reduce((str, key) => {
            if (
                typeof responseSchema[key] === "boolean" ||
                typeof responseSchema[key] === "string"
            ) {
                if (str.length === 0) {
                    return key;
                }
                return `${str},${key}`;
            }

            if (typeof responseSchema[key] === "object") {
                if (str.length === 0) {
                    return `${key}(${formFieldsStr(responseSchema[key])})`;
                }
                return `${str},${key}(${formFieldsStr(responseSchema[key])})`;
            }

            return str;
        }, "");
    }

    const query = new URLSearchParams({
        part: formPartStr(responseSchema),
        fields: formFieldsStr(responseSchema),
        ...additionalParams,
    });

    return query.toString();
}

async function getResponse(request, { needsAuth }) {
    if (needsAuth) {
        const session = await auth();

        request.headers.append(
            "Authorization",
            `Bearer ${session.accessToken}`,
        );
    }

    try {
        const response = await fetch(request);

        if (!response.ok) {
            const { error } = await response.json();
            console.log(error);
            throw new Error("Got error as response");
        }

        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error("Unable to get response");
    }
}

export async function getPlaylistInfo(playlistId) {
    const responseSchema = {
        items: {
            id: true,
            snippet: {
                title: true,
                description: true,
                thumbnails: { medium: { url: "thumbnailUrl" } },
            },
        },
    };

    const url = new URL("https://www.googleapis.com/youtube/v3/playlists");
    url.search = formQueryStr(responseSchema, { id: playlistId });

    const request = new Request(url);
    const response = await getResponse(request, { needsAuth: true });

    const playlistInfo = getData(response, responseSchema);
    return playlistInfo[0];
}

export async function getPlaylistVideosInfo(playlistId) {
    const responseSchema = {
        items: {
            snippet: {
                title: true,
                description: true,
                thumbnails: { medium: { url: "thumbnailUrl" } },
                position: true,
                resourceId: { videoId: "id" },
            },
        },
        nextPageToken: true,
    };

    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.search = formQueryStr(responseSchema, { playlistId, maxResults: 50 });

    const playlistVideosInfo = [];
    let nextPageToken;

    do {
        const request = new Request(url);
        const response = await getResponse(request, { needsAuth: true });

        playlistVideosInfo.push(...getData(response, responseSchema));
        nextPageToken = response.nextPageToken;

        if (nextPageToken) {
            url.searchParams.set("pageToken", nextPageToken);
        }
    } while (nextPageToken);

    return playlistVideosInfo;
}
