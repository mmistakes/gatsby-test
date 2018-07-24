const _ = require('lodash')
const moment = require('moment')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { createPaginationPages } = require('gatsby-pagination')

// Calculate post defaults.
const calculateDefaults = (node, getNode) => {
  const defaultSlug = createFilePath({ node, getNode, basePath: `pages` })
  const isPostShaped = defaultSlug.match(
    /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
  )

  if (isPostShaped) {
    const [, defaultDate, defaultTitle] = isPostShaped
    return [defaultSlug, defaultTitle, defaultDate]
  }

  const [, defaultTitle] = defaultSlug.match(/^\/(.*)\/$/)
  const defaultDate = moment().format('YYYY-MM-DD')
  return [defaultSlug, defaultTitle, defaultDate]
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    try {
      if (node.fields.sourceName !== `comments`) {
        const [defaultSlug, defaultTitle, defaultDate] = calculateDefaults(
          node,
          getNode
        )

        const date = node.frontmatter.date || defaultDate
        const title = defaultTitle
        const { categories } = node.frontmatter
        const categoriesPath = categories
          .join('/')
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .replace(/\s+/g, '-')
          .toLowerCase()
        const slug = `/${categoriesPath}/${title}/`

        createNodeField({ node, name: `slug`, value: slug })
        createNodeField({ node, name: `date`, value: date })
      }
    } catch (ex) {
      console.log('Error onCreateNode():', node.fileAbsolutePath, '\n', ex)
      throw ex
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const indexPage = path.resolve('./src/templates/index.js')
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
    const categoryPageTemplate = path.resolve('./src/templates/categories.js')
    const tagPageTemplate = path.resolve('./src/templates/tags.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [fields___date], order: DESC }
              filter: { fields: { sourceName: { ne: "comments" } } }
            ) {
              edges {
                node {
                  id
                  excerpt(pruneLength: 280)
                  timeToRead
                  fields {
                    slug
                    date(formatString: "MMMM DD, YYYY")
                  }
                  frontmatter {
                    title
                    excerpt
                    categories
                    tags
                    image {
                      path {
                        childImageSharp {
                          fluid(maxWidth: 750, quality: 90) {
                            base64
                            aspectRatio
                            src
                            srcSet
                            sizes
                          }
                        }
                      }
                      cover
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        // Create paginated index page
        createPaginationPages({
          createPage,
          edges: posts,
          component: indexPage,
          limit: 5,
        })

        // Create post pages
        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        const tagSet = new Set()
        const tagMap = new Map()
        const categorySet = new Set()
        const categoryMap = new Map()
        result.data.allMarkdownRemark.edges.forEach(edge => {
          if (edge.node.frontmatter.tags) {
            edge.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag)

              const array = tagMap.has(tag) ? tagMap.get(tag) : []
              array.push(edge)
              tagMap.set(tag, array)
            })
          }

          if (edge.node.frontmatter.categories) {
            edge.node.frontmatter.categories.forEach(category => {
              categorySet.add(category)

              const array = categoryMap.has(category)
                ? categoryMap.get(category)
                : []
              array.push(edge)
              categoryMap.set(category, array)
            })
          }

          const tagList = Array.from(tagSet)
          tagList.forEach(tag => {
            // Create paginated tag pages
            const tagFormatter = tag => route =>
              `/tag/${_.kebabCase(tag)}/${route !== 1 ? route : ''}`
            createPaginationPages({
              createPage,
              edges: tagMap.get(tag),
              component: tagPageTemplate,
              pathFormatter: tagFormatter(tag),
              limit: 5,
              context: {
                tag,
              },
            })
          })

          const categoryList = Array.from(categorySet)
          categoryList.forEach(category => {
            // Create paginated category pages
            const categoryFormatter = category => route =>
              `/${_.kebabCase(category)}/${route !== 1 ? route : ''}`
            createPaginationPages({
              createPage,
              edges: categoryMap.get(category),
              component: categoryPageTemplate,
              pathFormatter: categoryFormatter(category),
              limit: 5,
              context: {
                category,
              },
            })
          })
        })
      })
    )
  })
}
