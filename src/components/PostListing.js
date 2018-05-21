import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import React from 'react'
import Img from 'gatsby-image'

class PostListing extends React.Component {
  getPostList() {
    const postList = []
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        id: postEdge.node.id,
        path: postEdge.node.fields.slug,
        title: postEdge.node.frontmatter.title,
        excerpt: postEdge.node.frontmatter.excerpt,
        generatedExcerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
        date: postEdge.node.fields.date,
        categories: postEdge.node.frontmatter.categories,
        mainCategory: postEdge.node.frontmatter.categories[0],
        cover: postEdge.node.frontmatter.image.cover,
        imagePath: postEdge.node.frontmatter.image.path,
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
                marginBottom: '10px',
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
                marginBottom: '10px',
              }}
            >
              <small>
                {post.date} in{' '}
                {post.categories.map((category, i) => (
                  <span key={i}>
                    {!!i && ', '}
                    <Link to={`/${kebabCase(category)}/`}>{category}</Link>
                  </span>
                ))} &middot; {post.timeToRead} min read
              </small>
            </p>
            {post.cover == true ? (
              <Img
                sizes={post.imagePath.childImageSharp.sizes}
                style={{ marginBottom: '20px' }}
              />
            ) : (
              <div />
            )}
            {post.excerpt !== null ? (
              <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: post.generatedExcerpt }} />
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default PostListing
