import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";

import Posts from "../components/Posts";
import Pagination from "../components/CategoriesPagination";

export default function Categories({ pathContext, data }) {
  const { posts, category, pagesSum, page } = pathContext;
  return (
    <div>
      <section>
        <header><h1>{category}</h1></header>
      </section>

      <div>
        <Posts posts={posts} />
        <Pagination page={page} pagesSum={pagesSum} category={category} />
      </div>
    </div>
  );
};

Categories.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object,
}

export const categoriesQuery = graphql`
  query CategoriesSiteMetadata {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
