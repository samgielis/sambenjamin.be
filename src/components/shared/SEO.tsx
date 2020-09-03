import React from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  author: string;
  keywords: string[];
}

const sitename = "sambenjamin.be";

const SEO = ({ title, description, author, keywords }: SEOProps) => (
  <Helmet title={title}>
    <meta name="keywords" content={keywords.join(", ")} />
    <meta name="author" content={author} />
    <meta name="description" content={description} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={sitename} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:title" content={title} />
  </Helmet>
);

export default SEO;
