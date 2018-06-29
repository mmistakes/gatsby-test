import Img from 'gatsby-image'
import Link from 'gatsby-link'
import React from 'react'
import Helmet from 'react-helmet'
import Menu from '../components/Menu'
import config from '../../config/SiteConfig'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Header from '../components/Header'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

class GridExample extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    return (
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
        <Helmet title={`Grid Example | ${config.title}`} />
        <Menu />
        <Header />
        <PageTitle title="Grid Example" />
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
          }}
        >
          <p css={{ maxWidth: '600px' }}>
            Post index in grid format using <strong>gatsby-image</strong> to
            generate square thumbnail images from the same &ldquo;cover
            image&rdquo; source.
          </p>
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
              gridGap: `0.5em`,
              alignItems: `stretch`,
            }}
          >
            {posts.map(post => (
              <Link
                key={post.node.id}
                to={post.node.fields.slug}
                style={{
                  display: `block`,
                  width: `200px`,
                  height: `200px`,
                }}
              >
                <Img
                  resolutions={
                    post.node.frontmatter.image.path.childImageSharp.resolutions
                  }
                  style={{
                    maxWidth: `100%`,
                  }}
                  imgStyle={{
                    marginBottom: `0`,
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default GridExample

export const pageQuery = graphql`
  query GridExampleQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { image: { cover: { eq: true } } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            image {
              cover
              path {
                childImageSharp {
                  resolutions(width: 200, height: 200, quality: 90) {
                    ...GatsbyImageSharpResolutions
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
