import ReactGA from "react-ga";
import { Story, getStoryID } from "../model/Story";

export function downloadJSON(fileName: string): Promise<any> {
  return fetch(fileName).then((response) => {
    return response.json();
  });
}

export function getNameOfMonth(date: Date): string {
  let month = [];
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  return month[date.getMonth()];
}

export function getDateOrdinal(date: Date): string {
  const d = date.getDate();
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function trackPageView(url: string) {
  if (process.env.NODE_ENV === "production") {
    ReactGA.pageview(url);
  }
}

export interface CoverImageNode {
  relativeDirectory: string;
  childImageSharp: {
    original: {
      src: string;
    };
  };
}

export function addStaticURLToCoverImages(
  stories: Story[],
  coverImages: CoverImageNode[]
): void {
  stories.forEach((story) => {
    coverImages.forEach((coverImage) => {
      if (coverImage.relativeDirectory === getStoryID(story)) {
        story.photos.forEach((photo) => {
          if (photo.fileName.base === "cover.jpg") {
            photo.fileName.base = coverImage.childImageSharp.original.src;
          }
        });
      }
    });
  });
}
