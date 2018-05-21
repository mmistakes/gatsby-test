import Link from 'gatsby-link'
import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'

const IndexPage = ({ data, pathContext }) => {
  const { nodes, page, prev, next, pages, total, limit } = pathContext

  return (
    <div>
      <Helmet title={config.title} />
      <Header />
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
      <Footer />
    </div>
  )
}

export default IndexPage
