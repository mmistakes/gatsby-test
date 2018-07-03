import { Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

const IndexPage = ({ data, pageContext }) => {
  const { nodes, page, prev, next, pages } = pageContext

  return (
    <Layout>
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
        <Menu />
        <Header />
        <PageTitle title="Recent Posts" />
        <div
          id="main"
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
    </Layout>
  )
}

export default IndexPage
