import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../../config/SiteConfig'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

const Categories = ({ pathContext, data }) => {
  const { category, nodes, page, prev, next, pages, total, limit } = pathContext
  const { edges, totalCount } = data.allMarkdownRemark
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } filed in "${category}"`

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
      <Helmet title={`${category} | ${config.title}`} />
      <Header />
      <PageTitle title={categoryHeader} />
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
      </div>
      <Footer />
    </div>
  )
}

Categories.propTypes = {
  pathContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
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

export default Categories

export const pageQuery = graphql`
  query CategoryPage($category: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    pageImage: imageSharp(id: { regex: "/unsplash-image-11/" }) {
      sizes(maxWidth: 1280, quality: 90) {
        ...GatsbyImageSharpSizes
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
