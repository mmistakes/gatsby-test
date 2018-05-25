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
import presets, { colors } from '../utils/presets'

const Tags = ({ pathContext, data }) => {
  const { tag, nodes, page, prev, next, pages, total, limit } = pathContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <div
      className="archive"
      css={{
        [presets.mdDown]: {
          marginLeft: '5%',
          marginRight: '5%',
        },
        [presets.mdUp]: {
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
          [presets.mdUp]: {
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
          [presets.lgUp]: {
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
            [presets.mdUp]: {
              paddingRight: '5%',
            },
            [presets.lgUp]: {
              fontSize: '2.441em',
            }
          }}
        >
          {tagHeader}
        </h1>
      </div>
      <div
        className="page__cover"
        css={{
          position: 'relative',
          marginTop: '10px',
          [presets.mdUp]: {
            gridColumn: '5 / 11',
            gridRow: '1 / 4',
            marginTop: 0,
            objectFit: 'cover',
            objectPosition: 'center center',
            width: '100%',
            height: '100%',
          },
          [presets.lgUp]: {
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
          [presets.mdUp]: {
            gridColumn: '3 / 9',
            gridRow: '4 / span 1',
            alignSelf: 'flex-start',
          },
          [presets.lgUp]: {
            gridColumn: '3 / 8',
          },
          [presets.xlUp]: {
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
      sizes(maxWidth: 1280, quality: 90)  {
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
