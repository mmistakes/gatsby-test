import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../../config/SiteConfig'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'

const Tags = ({ pathContext, data }) => {
  const { tag, nodes, page, prev, next, pages, total, limit } = pathContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with &ldquo;${tag}&rdquo;`

  return (
    <div
      className="archive"
      css={{
        '@media(max-width: 767px)': {
          marginLeft: '5%',
          marginRight: '5%',
        },
        '@media(min-width: 768px)': {
          display: 'grid',
          gridTemplateColumns: '5% 5% 20% 10% 10% 10% 10% 20% 5% 5%',
          gridTemplateRows: '80px 35%',
          alignItems: 'end',
        },
      }}
    >
      <Helmet title={`${tag} | ${config.title}`} />
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
            gridRow: '2 / 3',
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
            fontFamily: '"Playfair Display", Times, serif',
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
          dangerouslySetInnerHTML={{ __html: tagHeader }}
        />
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
        {data.pageImage.sizes ? (
          <Img
            style={{
              width: '100%',
              height: '100%',
            }}
            sizes={data.pageImage.sizes}
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
        <PostListing postEdges={nodes} />
        <Pagination page={page} pages={pages} prev={prev} next={next} />
        <Link to="/tag/">All tags</Link>
      </div>
      <Footer />
    </div>
  )
}

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    pageImage: imageSharp(id: { regex: "/unsplash-image-10/" }) {
      sizes(maxWidth: 750) {
        ...GatsbyImageSharpSizes
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 280)
          timeToRead
          fields {
            slug
            date
          }
          frontmatter {
            title
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
      }
    }
  }
`
