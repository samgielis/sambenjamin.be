import AppInfo from "../../../package.json";

export function getLinkForTag(tag: string): string {
    return `/does/${tag}/`;
}

export function makeURL(partialURL: string): string {
    const base = process.env.NODE_ENV === "production" ? AppInfo.homepage : "/";

    return base + partialURL;
}