import React from "react";
import Helmet from "react-helmet";

export default ({ data, pathContext }) => {
  console.log(pathContext);
  const post = data.markdownRemark;
  const { date } = pathContext;
  return (
    <div>
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <div>{date}</div>
        </header>
        <section>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </section>
      </article>
    </div>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        categories
        tags
      }
    }
  }
`;
