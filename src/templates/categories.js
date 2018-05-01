import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'

const Categories = ({ pathContext, data }) => {
  const { category, nodes, page, prev, next, pages, total, limit } = pathContext
  const { edges, totalCount } = data.allMarkdownRemark
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } filed in "${category}"`

  return (
    <div>
      <Helmet title={`${category} | ${config.title}`} />
      <h1>{categoryHeader}</h1>
      <PostListing postEdges={nodes} />
      <Pagination page={page} pages={pages} prev={prev} next={next} />
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
