import { Photo } from "./Photo";

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
    return `/stories/${getStoryID(story)}/cover.jpg`
}