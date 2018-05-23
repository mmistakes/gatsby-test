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
    <div
      className="archive"
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
      <Helmet title={config.title} />
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
            gridRow: '2 / 3',
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
            fontFamily: '"Alegreya", serif',
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
          Recent Posts
        </h1>
      </div>
      <div
        className="page__main"
        css={{
          marginTop: '1em',
          '@media(min-width: 768px)': {
            gridColumn: '3 / 7',
            gridRow: '4 / span 1',
            alignSelf: 'flex-start',
          },
          '@media(min-width: 1024px)': {
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
