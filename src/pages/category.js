import { graphql, Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
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
  <Layout>
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
      <Helmet title={`All Categories | ${title}`} />
      <Menu />
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
            },
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
                <span>{category.fieldValue}</span>{' '}
                <span className="count">{category.totalCount}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  </Layout>
)

export default CategoriesPage

export const pageQuery = graphql`
  query CategoriesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fields: { sourceName: { ne: "comments" } } }) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
