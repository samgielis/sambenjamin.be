import { Photo } from "./Photo";

export type StoryIndex = {
    stories: string[]
}

export type Story = {
    title: string,
    subTitle?: string,
    description?: string,
    date: string,
    photos: Photo[]
    tags: string[]
}

export function getStoryID(story: Story): string {
    return story.title.split(" ").join("-").toLowerCase();
}