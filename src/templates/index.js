import Link from 'gatsby-link';
import React from 'react';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import Pagination from '../components/Pagination';
import { rhythm } from '../utils/typography';

const IndexPage = ({ data, pathContext }) => {
  const { nodes, page, prev, next, pages, total, limit } = pathContext

  return (
    <div>
      <Helmet title={config.title} />
      {nodes.map(({ node }) => (
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
      ))}
      <Pagination page={page} pages={pages} prev={prev} next={next} />
    </div>
  )
}

export default IndexPage
