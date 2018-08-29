import * as PropTypes from 'prop-types'
import chunk from 'lodash/chunk'
import Img from 'gatsby-image'
import { graphql, Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import Menu from '../components/Menu'
import config from '../../config/SiteConfig'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = 8
}

class GridExample extends React.Component {
  constructor() {
    super()
    let postsToShow = 8

    this.state = {
      showingMore: postsToShow > 8,
      postsToShow,
    }
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (this.state.showingMore && distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 8 })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
  }

  render() {
    const posts = this.props.data.allMarkdownRemark.edges.map(e => e.node)

    return (
      <Layout>
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
            {chunk(posts.slice(0, this.state.postsToShow), 4).map((chunk, i) => (
              <div
                key={`chunk-${i}`}
                style={{
                  display: `grid`,
                  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
                  gridGap: `0.5em`,
                  alignItems: `stretch`,
                }}
              >
                {chunk.map(post => (
                  <Link
                    style={{
                      display: `block`,
                      width: `200px`,
                      height: `200px`,
                    }}
                    to={post.fields.slug}
                  >
                    <Img
                      fixed={
                        post.frontmatter.image.path.childImageSharp.fixed
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
            ))}
            {!this.state.showingMore && (
              <a
                data-testid="load-more"
                style={{
                  margin: `0 auto`,
                  padding: `0.5em`,
                  color: `#fff`,
                  backgroundColor: `#000`,
                  border: `1px solid #000`,
                  cursor: `pointer`,
                }}
                onClick={() => {
                  this.setState({
                    postsToShow: this.state.postsToShow + 20,
                    showingMore: true,
                  })
                }}
              >
                Load more
              </a>
            )}
          </div>
          <Footer />
        </div>
      </Layout>
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
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: "gallery" } } }
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
                  fixed(width: 200, height: 200, quality: 90) {
                    ...GatsbyImageSharpFixed
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
