import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";

const Pagination = ({ prevPath, nextPath, page, pagesSum }) => (
  <nav>
    {prevPath ? (
      <Link to={prevPath}>Newer Posts</Link>
    ) : (
      <div>No more pages</div>
    )}
    <span>{`Page ${page} of ${pagesSum}`}</span>
    {nextPath ? (
      <Link to={nextPath}>Older Posts</Link>
    ) : (
      <div>No more pages</div>
    )}
  </nav>
);

Pagination.propTypes = {
  prevPath: PropTypes.string,
  nextPath: PropTypes.string,
  page: PropTypes.number,
  pagesSum: PropTypes.number,
};

export default Pagination;
