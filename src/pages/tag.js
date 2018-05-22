import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Footer from '../components/Footer'
import Header from '../components/Header'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
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
        gridTemplateRows: '80px 35%',
        alignItems: 'end',
      },
    }}
  >
    <Helmet title={`All Tags | ${config.title}`} />
    <Header />
    <div
      className="page__title"
      css={{
        '@media(min-width: 768px)': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
          gridColumn: '2 / span 4',
          gridRow: '2 / span 2',
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
      >
        All Tags
      </h1>
    </div>
    <div
      className="page__main"
      css={{
        marginTop: '1em',
        '@media(min-width: 768px)': {
          gridColumn: '3 / 8',
          gridRow: '4 / span 1',
        },
        '@media(min-width: 1024px)': {
          gridColumn: '3 / 7',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          '@media(min-width: 768px)': {
            display: 'grid',
            gridColumnGap: '2em',
          },
          '@media(min-width: 1024px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          }
        }}
      >
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.25em 0',
                color: 'inherit',
                textDecoration: 'none',
              }}
              to={`/tag/${kebabCase(tag.fieldValue)}/`}
            >
              <span>{tag.fieldValue}</span> <span className="count">{tag.totalCount}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
  </div>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
