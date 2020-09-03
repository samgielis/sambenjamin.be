import { resolve } from "path";
import { GatsbyNode, Actions } from "gatsby";

interface StoryQueryResults {
  data: {
    allFile: {
      nodes: { relativeDirectory: string }[];
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
        }
      }
    }
  `)) as StoryQueryResults;

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
