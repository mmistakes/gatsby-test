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
      <Posts posts={posts} />
    </div>
  );
}

Index.propTypes = {
  data: PropTypes.object,
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: {
        fields: {
          template: { eq: "post" }
        }
      }
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
