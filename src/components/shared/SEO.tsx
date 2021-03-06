import React from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  imageURL: string;
}

const sitename = "sambenjamin.be";

const SEO = ({ title, description, author, keywords, imageURL }: SEOProps) => (
  <Helmet title={title}>
    <meta name="keywords" content={keywords.join(", ")} />
    <meta name="author" content={author} />
    <meta name="description" content={description} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={sitename} />
    <meta property="og:image" content={imageURL} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:title" content={title} />
    <meta property="twitter:image" content={imageURL} />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />
  </Helmet>
);

export default SEO;
