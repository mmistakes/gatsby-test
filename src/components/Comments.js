import React from "react";
import Comment from "./Comment.js";

const Comments = data => {
  if (data.comments === null) {
    return "";
  }

  const { comments: { edges: comments } } = data;

  const commentList = comments.map(({ node }, index) => {
    const {
      fields: { slug: slug },
      frontmatter: {
        name,
        email,
        url,
        uuid,
        friendlyDate,
        iso8601Date,
        message
      }
    } = node;

    return (
      <Comment
        key={uuid}
        name={name}
        url={url}
        friendlyDate={friendlyDate}
        iso8601Date={iso8601Date}
        email={email}
        message={message}
      >
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </Comment>
    );
  });
  return <div>{commentList}</div>;
};

export default Comments;

export const CommentsBySlug = graphql`
  fragment commentsQueryFragment on RootQueryType {
    comments: allMarkdownRemark(
      filter: { fields: { slug: { eq: $slug }, template: { eq: "comment" } } }
      sort: { fields: [fields___slug, fields___date], order: ASC }
    ) {
      edges {
        node {
          ...commentAttributesFragment
        }
      }
    }
  }
`;
