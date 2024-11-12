import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export function ContentCard({ content }) {
    const thumbnailSrc = content.thumbnailBuffer
        ? `data:${content.thumbnailType};base64,${content.thumbnailBuffer.toString("base64")}`
        : content.thumbnailUrl;

    return (
        <div
            key={`content-${content.id}`}
            className="card lg:card-side bg-base-100 glass shadow-lg lg:mb-6 max-w-[320px] lg:max-w-none lg:max-h-[180px]"
        >
            <figure className="flex-shrink-0 min-w-[320px] min-h-[180px]">
                <img src={thumbnailSrc} alt={`content-${content.id}`} />
            </figure>
            <div className="card-body py-6">
                <h2 className="card-title">{content.title}</h2>
                <p className="flex-grow-0">{content.description}</p>
                <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag) => {
                        return (
                            <div className="badge badge-secondary">{tag}</div>
                        );
                    })}
                </div>
            </div>
            <div className="flex-shrink-0 divider md:divider-horizontal m-0 -mb-2 md:mb-0 md:-mr-2 px-6 md:px-0 md:py-4"></div>
            <div className="flex-shrink-0 flex flex-col gap-2 py-6 px-8">
                <a
                    href={`https://youtube.com/playlist?list=${content.id}`}
                    target="_blank"
                    className="text-[#282828] hover:text-[#FF0000]"
                >
                    <FontAwesomeIcon icon={faYoutube} fixedWidth size="xl" />
                </a>
            </div>
        </div>
    );
}

export function ContentCardSkeleton({ key }) {
    return (
        <div
            key={key}
            className="card lg:card-side bg-base-100 glass shadow-lg lg:mb-6 max-w-[320px] lg:max-w-none lg:max-h-[180px]"
        >
            <figure className="skeleton flex-shrink-0 min-w-[320px] min-h-[180px]"></figure>
            <div className="card-body py-6">
                <div className="skeleton card-title h-6 w-1/2"></div>
                <p className="skeleton flex-grow-0 h-4"></p>
                <div className="flex flex-wrap gap-2">
                    {Array(3)
                        .fill()
                        .map(() => {
                            return <div className="skeleton badge w-16"></div>;
                        })}
                </div>
            </div>
            <div className="flex-shrink-0 divider md:divider-horizontal m-0 -mb-2 md:mb-0 md:-mr-2 px-6 md:px-0 md:py-4"></div>
            <div className="flex-shrink-0 flex flex-col gap-2 py-6 px-8">
                {Array(3)
                    .fill()
                    .map(() => {
                        return <div className="skeleton badge w-8"></div>;
                    })}
            </div>
        </div>
    );
}

export async function ContentsDisplay({ contents }) {
    return (
        <div className="flex flex-wrap gap-6 justify-center lg:block">
            {contents.map((content) => {
                return <ContentCard content={content} />;
            })}
        </div>
    );
}

export function ContentsDisplaySkeleton() {
    return (
        <div className="flex flex-wrap gap-6 justify-center lg:block">
            {Array(4)
                .fill()
                .map((e, i) => {
                    return <ContentCardSkeleton key={i} />;
                })}
        </div>
    );
}
