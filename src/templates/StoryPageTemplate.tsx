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
  };
}

const StoryPageTemplate = ({ data }: StoryPageTemplateProps) => {
  const story = data.allFile.nodes[0].childStoryIndex;

  story.photos.forEach((photo) => {
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
          layout
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
  }
`;
