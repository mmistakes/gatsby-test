import Img from 'gatsby-image'
import Link from 'gatsby-link'
import React from 'react'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import { rhythm } from '../utils/typography'

class GridExample extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <div>
        <Helmet title={`Grid Example | ${config.title}`} />
        <div>
          <h1>Grid Example</h1>
          <p>Post index in grid format using <strong>gatsby-image</strong> to generate square thumbnail images from the same "cover image" source.</p>
          {posts.map(post => (
            <Link
              key={post.node.id}
              to={post.node.fields.slug}
              style={{
                display: `inline-block`,
                width: `100%`,
                maxWidth: 250,
                position: `relative`,
              }}
            >
              <Img
                resolutions={
                  post.node.frontmatter.image.path.childImageSharp.resolutions
                }
                style={{
                  width: `100%`
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default GridExample

export const pageQuery = graphql`
  query GridExampleQuery {
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
                  resolutions(width: 250, height: 250, quality: 90) {
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
