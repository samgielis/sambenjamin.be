// All exported variables in this file will also used in gatsby-config.js.
import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const siteMetadata = {
  title: `sambenjamin.be`,
  description: `Sam benjamin's photography portfolio`,
  author: `Sam Gielis <samgielis@gmail.com>`,
  siteUrl: `https://sambenjamin.be`,
};

export const plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `stories`,
      path: `${__dirname}/src/stories/`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `src`,
      path: `${__dirname}/src/`,
    },
  },
  {
    resolve: `gatsby-transformer-json`,
    options: {
      typeName: `storyIndex`, // a fixed string
    },
  },
  `gatsby-plugin-typescript`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sitemap`,
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // `gatsby-plugin-offline`,
];
