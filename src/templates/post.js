import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

export default function Template({ data, pathContext }) {
  const { markdownRemark: post } = data;
  const { next } = pathContext;

  return (
    <div>
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
        </header>
        <section>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
      </article>
    </div>
  );
};

Template.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object,
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        categories
        tags
      }
    }
  }
`;
