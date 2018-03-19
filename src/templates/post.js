import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import SubmitComment from '../components/SubmitComment.js'
import Comments from '../components/Comments.js'

export default function Template({ data, pathContext }) {
  const { markdownRemark: post, comments } = data;
  const { slug, next } = pathContext;

  return (
    <div>
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
        </header>
        <section>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
        <section>
          <h2>Comments</h2>
          <Comments comments={comments} />
          <SubmitComment slug={slug} />
        </section>
      </article>
    </div>
  );
};

Template.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.object,
  comments: PropTypes.object
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    markdownRemark(fields: {
      slug: { eq: $slug },
      template: { eq: "post" }
    }) {
      html
      fields {
        slug
      }
      excerpt
      frontmatter {
        title
        categories
        tags
      }
    }
    ...commentsQueryFragment
  }
`;
