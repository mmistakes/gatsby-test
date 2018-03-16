import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";

import Posts from "../components/Posts";
import Pagination from "../components/TagsPagination";

export default function Tags({ pathContext, data }) {
  const { posts, tag, pagesSum, page } = pathContext;

  return (
    <div>
      <section>
        <header><h1>{tag}</h1></header>
        <h2>A {posts.length} posts collection</h2>
      </section>

      <div>
        <Pagination page={page} pagesSum={pagesSum} tag={tag} />
        <Posts posts={posts} />
      </div>
    </div>
  );
};

Tags.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object,
}

export const tagsQuery = graphql`
  query TagsSiteMetadata {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
