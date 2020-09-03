import { Photo } from "./Photo";

export type StoryIndex = {
  stories: string[];
};

export type Story = {
  title: string;
  subTitle?: string;
  description?: string;
  instaHandle?: string;
  date: string;
  photos: Photo[];
  layout: number[];
  tags?: string[];
  coverURL?: string;
};

export function getStoryID(story: Story): string {
  return story.title.replace("&", "and").split(" ").join("-").toLowerCase();
}

export function getStoryCoverImageURL(story: Story): string {
  if (story.coverURL) {
    return story.coverURL;
  }
  let coverImageUrl = "";
  story.photos.forEach((photo) => {
    if (photo.fileName.base.indexOf("cover") > -1) {
      coverImageUrl = photo.fileName.base;
    }
  });
  return coverImageUrl;
}
