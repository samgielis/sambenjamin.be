import React from "react";
import { PageProps, graphql } from "gatsby";
import { Story } from "../components/model/Story";
import { AUTHOR } from "../components/model/Author";
import { HomePage } from "../components/pages/home/HomePage";
import Layout from "../components/Layout";

interface HomePageQueryProps {
  allFile: {
    nodes: {
      childStoryIndex: Story;
      relativeDirectory: string;
    }[];
  };
}

type IndexPageProps = PageProps<HomePageQueryProps>;

const Index = ({ data }: IndexPageProps) => {
  const stories = data.allFile.nodes.map(
    (storyNode) => storyNode.childStoryIndex
  );
  return (
    <Layout>
      <HomePage stories={stories} author={AUTHOR} />
    </Layout>
  );
};
export default Index;

export const query = graphql`
  query {
    allFile(filter: { childStoryIndex: { title: { glob: "*" } } }) {
      nodes {
        childStoryIndex {
          title
          date
          description
          instaHandle
          layout
          photos {
            aperture
            focalLength
            height
            iso
            shutterSpeed
            width
            fileName {
              base
            }
          }
          subTitle
          tags
        }
        relativeDirectory
      }
    }
  }
`;
