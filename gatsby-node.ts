import { resolve } from "path";
import { GatsbyNode, Actions } from "gatsby";
import { Story } from "./src/components/model/Story";

interface StoryQueryResults {
  data: {
    allFile: {
      nodes: {
        relativeDirectory: string;
        childStoryIndex: Story;
      }[];
    };
  };
}

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;
  const result: StoryQueryResults = (await graphql(`
    query {
      allFile(filter: { childStoryIndex: { title: { glob: "*" } } }) {
        nodes {
          relativeDirectory
          childStoryIndex {
            tags
          }
        }
      }
    }
  `)) as StoryQueryResults;

  let allTags: string[] = getTagSet(
    result.data.allFile.nodes.map((node) => node.childStoryIndex)
  );

  await Promise.all(
    allTags.map(async (tag) => {
      let component = resolve("./src/templates/TagPageTemplate.tsx");
      if (!component) {
        return;
      }

      // eslint-disable-next-line no-console
      console.log("Creating tag page", tag);
      const slug = `does/${tag}`;
      await createPage({
        path: slug,
        component,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: slug,
          tag: tag,
        },
      });
    })
  );

  await Promise.all(
    result.data.allFile.nodes.map(async ({ relativeDirectory }) => {
      let component = resolve("./src/templates/StoryPageTemplate.tsx");
      if (!component) {
        return;
      }

      // eslint-disable-next-line no-console
      console.log("Creating story page", relativeDirectory);

      await createPage({
        path: relativeDirectory,
        component,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: relativeDirectory,
        },
      });
    })
  );
};

function getTagSet(stories: Story[]): string[] {
  let tagSet: string[] = [];
  stories.forEach((story) => {
    if (story.tags) {
      tagSet.push(...story.tags);
    }
  });
  return [...new Set(tagSet)];
}
