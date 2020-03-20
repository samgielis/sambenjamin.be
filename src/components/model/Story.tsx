import { Photo } from "./Photo";
import { makeURL } from "../util/URLUtils";

export type StoryIndex = {
    stories: string[]
}

export type Story = {
    title: string,
    subTitle?: string,
    description?: string,
    instaHandle?: string,
    date: string,
    photos: Photo[],
    layout: number[],
    tags?: string[]
}

export function getStoryID(story: Story): string {
    return story.title.split(" ").join("-").toLowerCase();
}

export function getStoryCoverImageURL(story: Story): string {
    return makeURL(`stories/${getStoryID(story)}/cover.jpg`);
}