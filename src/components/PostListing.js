import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import React from 'react'
import { rhythm } from '../utils/typography'

class PostListing extends React.Component {
  getPostList() {
    const postList = []
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        id: postEdge.node.id,
        path: postEdge.node.fields.slug,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        categories: postEdge.node.frontmatter.categories,
        mainCategory: postEdge.node.frontmatter.categories[0],
      })
    })
    return postList
  }

  render() {
    const postList = this.getPostList()
    return (
      <div>
        {/* Your post list here. */
        postList.map(post => (
          <div key={post.id}>
            <h3
              style={{
                marginBottom: rhythm(1 / 2),
              }}
            >
              <Link
                style={{ textDecoration: 'none' }}
                to={post.path}
                key={post.title}
              >
                {post.title}
              </Link>
            </h3>
            <p
              style={{
                marginBottom: rhythm(1 / 2),
              }}
            >
              <small>
                {post.date} in{' '}
                {post.categories.map((category, i) => (
                  <span key={i}>
                    {!!i && ', '}
                    <Link to={`/${kebabCase(category)}/`}>{category}</Link>
                  </span>
                ))}
              </small>
            </p>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
        ))}
      </div>
    )
  }
}

export default PostListing
