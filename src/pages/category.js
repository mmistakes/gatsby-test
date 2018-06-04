import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Header from '../components/Header'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

const CategoriesPage = ({
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
    <Helmet title={`All Categories | ${config.title}`} />
    <Header />
    <PageTitle title="All Categories" />
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
      <ul
        css={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          [presets.smUp]: {
            display: 'grid',
            gridColumnGap: '2em',
          },
          [presets.mdUp]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
          }
        }}
      >
        {group.map(category => (
          <li key={category.fieldValue}>
            <Link
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.25em 0',
                color: 'inherit',
                textDecoration: 'none',
              }}
              to={`/${kebabCase(category.fieldValue)}/`}
            >
              <span>{category.fieldValue}</span> <span className="count">{category.totalCount}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
  </div>
)

CategoriesPage.propTypes = {
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

export default CategoriesPage

export const pageQuery = graphql`
  query CategoriesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
