import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Header from '../components/Header'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

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
    <Helmet title={`All Tags | ${config.title}`} />
    <Header />
    <PageTitle title="All Tags" />
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
              <span>{tag.fieldValue}</span>{' '}
              <span className="count">{tag.totalCount}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
  </div>
)

export default TagsPage

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fields: { type: { eq: "post" } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
