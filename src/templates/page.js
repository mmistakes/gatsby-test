import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Pagination from "../components/Pagination";
import Posts from "../components/Posts";

export default function Pages({ pathContext, data }) {
  const { posts, page, pagesSum, prevPath, nextPath } = pathContext;
  return (
    <section>
      <Pagination page={page} pagesSum={pagesSum} prevPath={prevPath} nextPath={nextPath} />
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
        title
      }
    }
  }
`;
