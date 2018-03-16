import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

import Posts from "../components/Posts";

export default function Index({ data }) {
  let { edges: posts } = data.allMarkdownRemark;
  posts = posts.map(post => post.node);
  return (
    <div>
      <header>Latest Posts</header>
      <div>
        <h3><Link to="/page/2">Older Posts</Link></h3>
      </div>
    </div>
  );
}

Index.propTypes = {
  data: PropTypes.object,
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 5
    ) {
      edges {
        node {
          excerpt
          id
          fields {
            slug
            date
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;
