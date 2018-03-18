import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

// import Pagination from "../components/Pagination";
import Posts from "../components/Posts";

export default function Pages({ pathContext, data }) {
  const { posts } = pathContext;
  return (
    <section>
      <Posts posts={posts} />
    </section>
  );
};

Pages.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object,
}

export const pagesQuery = graphql`
  query PagesSiteMetadata {
    site {
      siteMetadata {
        description
        siteUrl
      }
    }
  }
`;
