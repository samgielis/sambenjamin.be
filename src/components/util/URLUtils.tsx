export function getLinkForTag(tag: string): string {
    return `/does/${tag}/`;
}

export function makeURL(partialURL: string): string {
    let base = "/";
    return base + partialURL;
}