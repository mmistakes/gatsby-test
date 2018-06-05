import Img from 'gatsby-image'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import PageTitle from '../components/PageTitle'
import PageMeta from '../components/PageMeta'
import Comments from '../components/Comments'
import CommentsForm from '../components/CommentsForm'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PostPagination from '../components/PostPagination'
import PostCategories from '../components/PostCategories'
import PostTags from '../components/PostTags'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const comments = this.props.data.comments
    const { slug, previous, next } = this.props.pathContext

    return (
      <div
        className="post"
        css={{
          [presets.mdDown]: {
            marginLeft: '5%',
            marginRight: '5%',
          },
          [presets.mdUp]: {
            display: 'grid',
            gridTemplateColumns: '5% 5% 20% 10% 10% 10% 10% 20% 5% 5%',
            gridTemplateRows: '80px 100px 35%',
            alignItems: 'end',
          },
        }}
      >
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Header />
        <PageTitle title={post.frontmatter.title} author="First Lastname" />
        <PageMeta timeToRead={post.timeToRead} date={post.fields.date} />
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
          {post.frontmatter.image.cover === true ? (
            <Img
              style={{
                width: '100%',
                height: '100%',
              }}
              sizes={post.frontmatter.image.path.childImageSharp.sizes}
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
              gridColumn: '3 / 7',
              gridRow: '4 / span 1',
              alignSelf: 'flex-start',
            },
            [presets.lgUp]: {
              gridColumn: '3 / 7',
            },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Comments comments={comments} />
          <CommentsForm slug={slug} />
        </div>
        <div
          className="page__aside"
          css={{
            [presets.mdUp]: {
              gridColumn: 8,
              gridRow: 4,
              alignSelf: 'start',
            },
          }}
        >
          <PostCategories categories={post.frontmatter.categories} />
          <PostTags tags={post.frontmatter.tags} />
          <PostPagination previous={previous} next={next} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      tableOfContents
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
      frontmatter {
        title
        tags
        categories
        image {
          cover
          path {
            childImageSharp {
              sizes(maxWidth: 1280, quality: 90) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
    ...commentsQueryFragment
  }
`
