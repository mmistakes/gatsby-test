import Link from 'gatsby-link'
import React from 'react'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import config from '../../config/SiteConfig'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import PostListing from '../components/PostListing'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

const Tags = ({ pathContext, data }) => {
  const { tag, nodes, page, prev, next, pages } = pathContext
  const { totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

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
      <Helmet title={`${tag} | ${config.title}`} />
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
        {data.pageImage.childImageSharp.sizes ? (
          <Img
            style={{
              width: '100%',
              height: '100%',
            }}
            sizes={data.pageImage.childImageSharp.sizes}
          />
        ) : (
          <div />
        )}
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
        <PostListing postEdges={nodes} />
        <Pagination page={page} pages={pages} prev={prev} next={next} />
        <Link to="/tag/">All tags</Link>
      </div>
      <Footer />
    </div>
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
        sizes(maxWidth: 1280, quality: 90) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: {
        fields: { type: { eq: "post" } }
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
                  sizes(maxWidth: 750) {
                    ...GatsbyImageSharpSizes
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
