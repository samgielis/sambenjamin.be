import React from "react";
import { graphql } from "gatsby";
import { Story } from "../components/model/Story";
import Layout from "../components/Layout";
import TagPage from "../components/pages/tags/TagPage";
import { AUTHOR } from "../components/model/Author";

interface TagPageTemplateProps {
  data: {
    allFile: {
      nodes: { childStoryIndex: Story }[];
    };
  };
  pageContext: {
    tag: string;
  };
}

const TagPageTemplate = ({ data, pageContext }: TagPageTemplateProps) => {
  const tag = pageContext.tag;
  const stories = data.allFile.nodes.map((node) => node.childStoryIndex);

  return (
    <Layout>
      <TagPage tag={tag} stories={stories} author={AUTHOR} />
    </Layout>
  );
};

export default TagPageTemplate;

export const query = graphql`
  query($tag: String!) {
    allFile(
      filter: {
        extension: { eq: "json" }
        childStoryIndex: { tags: { in: [$tag] } }
      }
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
