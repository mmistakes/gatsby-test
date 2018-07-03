import { graphql, Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
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

const Tags = ({ pageContext, data }) => {
  const { tag, nodes, page, prev, next, pages } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

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
        <Helmet title={`${tag} | ${config.title}`} />
        <Menu />
        <Header />
        <PageTitle title={tagHeader} />
        <div
          className="page__cover"
          css={{
            position: 'relative',
            marginTop: '10px',
            [presets.mdUp]: {
              gridColumn: '5 / 11',
              gridRow: '1 / 4',
              marginTop: 0,
              objectFit: 'cover',
              objectPosition: 'center center',
              width: '100%',
              height: '100%',
            },
            [presets.lgUp]: {
              gridColumn: '4 / 11',
            },
            '& .gatsby-image-outer-wrapper': {
              width: '100%',
              height: '100%',
            },
          }}
        >
          {data.pageImage.childImageSharp.fluid ? (
            <Img
              style={{
                width: '100%',
                height: '100%',
              }}
              fluid={data.pageImage.childImageSharp.fluid}
            />
          ) : (
            <div />
          )}
        </div>
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
          <PostListing postEdges={nodes} />
          <Pagination page={page} pages={pages} prev={prev} next={next} />
          <Link to="/tag/">All tags</Link>
        </div>
        <Footer />
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    pageImage: file(relativePath: { eq: "unsplash-image-10.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1280, quality: 90) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: {
        fields: { sourceName: { ne: "comments" } }
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 280)
          timeToRead
          fields {
            slug
            date
          }
          frontmatter {
            title
            image {
              cover
              path {
                childImageSharp {
                  fluid(maxWidth: 750) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
