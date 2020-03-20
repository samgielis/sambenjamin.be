export function getLinkForTag(tag: string): string {
    return makeURL(`does/${tag}/`);
}

export function makeURL(partialURL: string): string {
    let base = "/";
    if (process.env.NODE_ENV === "production") {
        base = "https://samgielis.github.io/sambenjamin.be/";
    }
    return base + partialURL;
}