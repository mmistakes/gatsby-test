import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import React from 'react'
import { rhythm } from '../utils/typography'
import Img from 'gatsby-image'

class PostListing extends React.Component {
  getPostList() {
    const postList = []
    this.props.postEdges.forEach(postEdge => {
      console.log(`cover: ${postEdge.node.frontmatter.cover}`)
      postList.push({
        id: postEdge.node.id,
        path: postEdge.node.fields.slug,
        title: postEdge.node.frontmatter.title,
        cover: postEdge.node.frontmatter.image.cover,
        imagePath: postEdge.node.frontmatter.image.path,
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
            {post.cover == true ? (
              <Img
                sizes={post.imagePath.childImageSharp.sizes}
                style={{ marginBottom: rhythm(1) }}
              />
            ) : (
              <div />
            )}
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
        ))}
      </div>
    )
  }
}

export default PostListing
