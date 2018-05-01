import Link from 'gatsby-link'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import Bio from '../components/Bio'
import Comments from '../components/Comments'
import PostTags from '../components/PostTags'
import { rhythm, scale } from '../utils/typography'
import Img from 'gatsby-image'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const comments = this.props.data.comments
    const { previous, next, tags } = this.props.pathContext

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1>{post.frontmatter.title}</h1>
        {post.frontmatter.image.cover == true ? (
          <Img
            sizes={post.frontmatter.image.path.childImageSharp.sizes}
            style={{ marginBottom: rhythm(1) }}
          />
        ) : (
          <div />
        )}
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        >
          {post.fields.date} &middot; {post.timeToRead} min read
        </p>
        {post.tableOfContents !== '' ? (
          <div>
            <h2>Contents</h2>
            <div
              dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
              className="toc"
            />
          </div>
        ) : (
          <div />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <PostTags tags={post.frontmatter.tags} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Comments comments={comments} />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      tableOfContents
      fields {
        date(formatString: "MMMM DD, YYYY")
      }
      frontmatter {
        title
        tags
        image {
          cover
          path {
            childImageSharp {
              sizes(maxWidth: 750) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
    ...commentsQueryFragment
  }
`
