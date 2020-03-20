export function getLinkForTag(tag: string): string {
    return `/does/${tag}/`;
}

export function makeURL(partialURL: string): string {
    const base = process.env.NODE_ENV === "production" ? "https://samgielis.github.io/sambenjamin.be/" : "/";

    return base + partialURL;
}