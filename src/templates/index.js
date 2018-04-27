import Link from 'gatsby-link'
import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'

const IndexPage = ({ data, pathContext }) => {
  const { nodes, page, prev, next, pages, total, limit } = pathContext

  return (
    <div>
      <Helmet title={config.title} />
      <PostListing postEdges={nodes} />
      <Pagination page={page} pages={pages} prev={prev} next={next} />
    </div>
  )
}

export default IndexPage
