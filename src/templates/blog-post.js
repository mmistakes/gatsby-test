import Img from 'gatsby-image'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import Bio from '../components/Bio'
import Comments from '../components/Comments'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PostPagination from '../components/PostPagination'
import PostTags from '../components/PostTags'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const comments = this.props.data.comments
    const { previous, next, tags } = this.props.pathContext

    return (
      <div
        className="page"
        css={{
          '@media(max-width: 767px)': {
            marginLeft: '5%',
            marginRight: '5%',
          },
          '@media(min-width: 768px)': {
            display: 'grid',
            gridTemplateColumns: '5% 5% 20% 10% 10% 10% 10% 20% 5% 5%',
            gridTemplateRows: '80px 20% 35%',
            alignItems: 'end',
          },
        }}
      >
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Header />
        <div
          className="page__title"
          css={{
            '@media(min-width: 768px)': {
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'stretch',
              gridColumn: '2 / span 3',
              gridRow: '3 / span 1',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              zIndex: 10,
            },
          }}
        >
          <h1
            className="headline"
            css={{
              fontFamily: '"Playfair Display", Times, serif',
              fontWeight: 700,
              fontSize: '2.441em',
              lineHeight: 1.25,
              '@media(min-width: 768px)': {
                paddingRight: '5%',
              },
            }}
          >
            {post.frontmatter.title}
          </h1>
        </div>
        <div
          className="page__meta"
          css={{
            fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
            textTransform: 'uppercase',
            '@media(min-width: 768px)': {
              gridColumn: '3 / span 1',
              gridRow: '2 / span 1',
              '&::after': {
                content: '""',
                display: 'block',
                width: '80px',
                height: '3px',
                marginTop: '10px',
                backgroundColor: '#000',
              },
              '& span': {
                display: 'block',
              },
            },
          }}
        >
          <span className="page__read-time">{post.timeToRead} min read </span>
          <span
            className="page__date"
            css={{
              '@media(max-width: 767px)': {
                '&::before': {
                  content: `' · '`,
                },
              },
            }}
          >
            {post.fields.date}
          </span>
        </div>
        <div
          className="page__cover"
          css={{
            position: 'relative',
            marginTop: '10px',
            '@media(min-width: 768px)': {
              gridColumn: '4 / 11',
              gridRow: '1 / 4',
              marginTop: 0,
            },
          }}
        >
          {post.frontmatter.image.cover == true ? (
            <Img sizes={post.frontmatter.image.path.childImageSharp.sizes} />
          ) : (
            <div />
          )}
        </div>
        <div
          className="page__main"
          css={{
            marginTop: '5%',
            '@media(min-width: 768px)': {
              gridColumn: '3 / 7',
              gridRow: '4 / span 1',
            },
            '@media(min-width: 1024px)': {
              gridColumn: '3 / 7',
            },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Bio />
          <Comments comments={comments} />
        </div>
        <div
          className="page__aside"
          css={{
            '@media(min-width: 768px)': {
              gridColumn: '3 / 8',
              gridRow: 5,
              alignSelf: 'start',
            },
            '@media(min-width: 1024px)': {
              gridColumn: 8,
              gridRow: 4,
            },
          }}
        >
          <PostTags tags={post.frontmatter.tags} />
          <PostPagination previous={previous} next={next} />
        </div>
        <Footer />
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
              sizes(maxWidth: 1280, quality: 90) {
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
