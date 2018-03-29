import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { rhythm, scale } from '../utils/typography'
import Pagination from '../components/Pagination'

const Categories = ({ pathContext, data }) => {
  // const siteTitle = get(this, 'data.site.siteMetadata.title')
  const siteTitle = `Jekyll → Gatsby MVP`
  const { category, nodes, page, prev, next, pages, total, limit } = pathContext
  const { edges, totalCount } = data.allMarkdownRemark
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } filed in "${category}"`

  return (
    <div>
      <Helmet title={`${category} | ${siteTitle}`} />
      <h1>{categoryHeader}</h1>
      {nodes.map(({ node }) => {
        const title = get(node, 'frontmatter.title') || node.fields.slug
        return (
          <div key={node.id}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
            </h3>
            <small>{node.fields.date}</small>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        )
      })}
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
          excerpt
          fields {
            slug
            date
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
