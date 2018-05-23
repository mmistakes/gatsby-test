import Img from 'gatsby-image'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import Bio from '../components/Bio'
import Comments from '../components/Comments'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PostPagination from '../components/PostPagination'
import PostCategories from '../components/PostCategories'
import PostTags from '../components/PostTags'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const comments = this.props.data.comments
    const { previous, next, tags, categories } = this.props.pathContext

    return (
      <div
        className="post"
        css={{
          '@media(max-width: 767px)': {
            marginLeft: '5%',
            marginRight: '5%',
          },
          '@media(min-width: 768px)': {
            display: 'grid',
            gridTemplateColumns: '5% 5% 20% 10% 10% 10% 10% 20% 5% 5%',
            gridTemplateRows: '80px 100px 35%',
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
              minHeight: '300px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'stretch',
              gridColumn: '2 / span 4',
              gridRow: '3 / span 1',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              zIndex: 10,
            },
            '@media(min-width: 1024px)': {
              gridColumn: '2 / span 3',
            }
          }}
        >
          <h1
            className="headline"
            css={{
              alignSelf: 'flex-start',
              fontFamily: '"Alegreya", serif',
              fontWeight: 700,
              fontSize: '1.953em',
              lineHeight: 1.25,
              textDecoration: 'underline',
              '@media(min-width: 768px)': {
                paddingRight: '5%',
              },
              '@media(min-width: 1024px)': {
                fontSize: '2.441em',
              }
            }}
          >
            {post.frontmatter.title}
          </h1>
          <div
            className="byline"
            css={{
              alignSelf: 'flex-start',
              fontFamily: '"Alegreya", serif',
              fontSize: '0.8em',
              '&::before': {
                content: '"__"',
              },
              '@media(min-width: 768px)': {
                fontSize: '1.25em',
              }
            }}
          >
            First Lastname
          </div>
        </div>
        <div
          className="page__meta"
          css={{
            fontFamily: 'Menlo, Consolas, Monaco, "Courier New", Courier, monospace',
            fontSize: '0.8em',
            textTransform: 'uppercase',
            '@media(min-width: 768px)': {
              gridColumn: '3 / span 2',
              gridRow: '2 / 3',
              '&::after': {
                content: '""',
                display: 'block',
                width: '40px',
                height: '3px',
                marginTop: '10px',
                backgroundColor: '#000',
              },
              '& span': {
                display: 'block',
              },
            },
            '@media(min-width: 1024px)': {
              gridColumn: '3 / 4',
            }
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
              gridColumn: '5 / 11',
              gridRow: '1 / 4',
              marginTop: 0,
              objectFit: 'cover',
              objectPosition: 'center center',
              width: '100%',
              height: '100%',
            },
            '@media(min-width: 1024px)': {
              gridColumn: '4 / 11',
            },
            '& .gatsby-image-outer-wrapper': {
              width: '100%',
              height: '100%',
            }
          }}
        >
          {post.frontmatter.image.cover == true ? (
            <Img
              style={{
                width: '100%',
                height: '100%',
              }}
              sizes={post.frontmatter.image.path.childImageSharp.sizes}
            />
          ) : (
            <div />
          )}
        </div>
        <div
          className="page__main"
          css={{
            marginTop: '1em',
            '@media(min-width: 768px)': {
              gridColumn: '3 / 7',
              gridRow: '4 / span 1',
              alignSelf: 'flex-start',
            },
            '@media(min-width: 1024px)': {
              gridColumn: '3 / 7',
            },
          }}
        >
          <div
            css={{
              '& > p:first-child::first-letter': {
                float: 'left',
                fontSize: '3.5em',
                lineHeight: '1em',
                paddingRight: '0.125em',
              }
            }}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <Comments comments={comments} />
        </div>
        <div
          className="page__aside"
          css={{
            '@media(min-width: 768px)': {
              gridColumn: 8,
              gridRow: 4,
              alignSelf: 'start',
            },
          }}
        >
          <PostCategories categories={post.frontmatter.categories} />
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
        categories
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
