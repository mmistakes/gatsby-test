import React from 'react'
import { graphql } from 'gatsby'
import Comment from './Comment'

const Comments = data => {
  if (data.comments === null) {
    return null
  }
  const {
    comments: { edges: comments },
  } = data

  const commentList = comments.map(({ node }) => {
    const {
      frontmatter: { name, url, email, uuid, friendlyDate, iso8601Date },
      html,
    } = node

    return (
      <Comment
        key={uuid}
        name={name}
        url={url}
        friendlyDate={friendlyDate}
        iso8601Date={iso8601Date}
        email={email}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Comment>
    )
  })
  return (
    <div>
      <h2>Comments</h2>
      {commentList}
    </div>
  )
}

export default Comments

export const CommentsBySlug = graphql`
  fragment commentsQueryFragment on RootQueryType {
    comments: allMarkdownRemark(
      filter: {
        fields: { sourceName: { eq: "comments" } }
        frontmatter: { _parent: { eq: $slug } }
      }
      sort: { fields: [fields___slug, frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          ...commentAttributesFragment
        }
      }
    }
  }
`
