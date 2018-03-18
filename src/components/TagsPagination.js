import React from "react";
import Link from "gatsby-link";
import kebabCase from "lodash/kebabcase";
import PropTypes from "prop-types";

const Pagination = ({ tag, page, pagesSum }) => (
  <nav>
    {page === 2 && (
      <Link to={`/tag/${kebabCase(tag)}/`}>Newer Posts</Link>
    )}
    {page > 2 && (
      <Link to={`/tag/${kebabCase(tag)}/page/${page - 1}/`}>Newer Posts</Link>
    )}
    <span>{`Page ${page} of ${pagesSum}`}</span>
    {page < pagesSum && (
      <Link to={`/tag/${kebabCase(tag)}/page/${page + 1}/`}>Older Posts</Link>
    )}
  </nav>
);

Pagination.propTypes = {
  tag: PropTypes.string,
  page: PropTypes.number,
  pagesSum: PropTypes.number,
};

export default Pagination;
