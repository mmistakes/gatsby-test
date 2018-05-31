import Link from 'gatsby-link'
import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

const IndexPage = ({ data, pathContext }) => {
  const { nodes, page, prev, next, pages, total, limit } = pathContext

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
      <Helmet title={config.title} />
      <Header />
      <div
        className="page__title"
        css={{
          [presets.mdUp]: {
            display: 'flex',
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
            fontFamily: fonts.alternate,
            fontWeight: 700,
            fontSize: '1.953em',
            fontVariantLigatures: 'common-ligatures',
            fontFeatureSettings: '"kern" on, "liga" on, "clig" on, "calt" on, "frac" on',
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
          Recent Posts
        </h1>
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
        <ul>
          <li>
            <Link to="/category/">All Categories</Link>
          </li>
          <li>
            <Link to="/tag/">All Tags</Link>
          </li>
          <li>
            <Link to="/grid-example/">Grid Example</Link>
          </li>
        </ul>
        <PostListing postEdges={nodes} />
        <Pagination page={page} pages={pages} prev={prev} next={next} />
      </div>
      <Footer />
    </div>
  )
}

export default IndexPage
