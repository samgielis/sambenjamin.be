import React from "react";
import { graphql } from "gatsby";
import { Story } from "../components/model/Story";
import Layout from "../components/Layout";
import StoryPage from "../components/pages/story/StoryPage";
import { AUTHOR } from "../components/model/Author";

interface StoryPageTemplateProps {
  data: {
    allFile: {
      nodes: { childStoryIndex: Story }[];
    };
    images: {
      nodes: {
        base: string;
        childImageSharp?: {
          original: {
            src: string;
          };
        };
      }[];
    };
    coverImage: {
      childImageSharp: {
        original: {
          src: string;
        };
      };
    };
  };
}

const StoryPageTemplate = ({ data }: StoryPageTemplateProps) => {
  const story = data.allFile.nodes[0].childStoryIndex;
  story.coverURL = data.coverImage.childImageSharp.original.src;
  story.photos.flat().forEach((photo) => {
    data.images.nodes.forEach((node) => {
      if (node.base === photo.fileName.base) {
        photo.fileName.base = node.childImageSharp.original.src;
      }
    });
  });

  return (
    <Layout>
      <StoryPage story={story} author={AUTHOR} />
    </Layout>
  );
};

export default StoryPageTemplate;

export const query = graphql`
  query($slug: String!) {
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "stories" }
        relativeDirectory: { eq: $slug }
        extension: { eq: "jpg" }
      }
    ) {
      nodes {
        base
        childImageSharp {
          original {
            src
          }
        }
      }
    }
    allFile(
      filter: { relativeDirectory: { eq: $slug }, extension: { eq: "json" } }
    ) {
      nodes {
        childStoryIndex {
          title
          date
          description
          instaHandle
          subTitle
          tags
          photos {
            aperture
            fileName {
              base
            }
            focalLength
            height
            iso
            shutterSpeed
            width
          }
        }
      }
    }
    coverImage: file(
      relativeDirectory: { eq: $slug }
      base: { eq: "cover.jpg" }
    ) {
      childImageSharp {
        original {
          src
        }
      }
    }
  }
`;
