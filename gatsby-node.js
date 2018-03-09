const fs = require("fs-extra");
const path = require("path");
const slugify = require("slug");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    const { categories } = node.frontmatter;
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const [, date, title] = slug.match(
      /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
    );
    // const value = `/${slugify(categories.concat([date]).join('-'), '/')}/${title}/`
    const value = `/${title}/`;
    createNodeField({ node, name: `slug`, value });
    createNodeField({ node, name: `date`, value: date });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    // Set templates.
    const postTemplate = path.resolve(`./src/templates/post.js`);
    const tagsTemplate = path.resolve(`./src/templates/tags.js`);

    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                    date
                  }
                  frontmatter {
                    title
                    categories
                    tags
                  }
                  excerpt
                }
              }
            }
          }
        `
      ).then(result => {
        const posts = result.data.allMarkdownRemark.edges;

        const createTagPages = (createPage, edges) => {
          // Create an empty object to store the posts.
          const posts = {};
          console.log("creating posts");

          // Loop through all nodes (Markdown posts) and add the tags to post object.
          edges.forEach(({ node }) => {
            if (node.frontmatter.tags) {
              node.frontmatter.tags.forEach(tag => {
                if (!posts[tag]) {
                  posts[tag] = [];
                }
                posts[tag].push(node);
              });
            }
          });

          // Create tags page listing from posts object.
          createPage({
            path: "/tags",
            component: tagsTemplate,
            context: {
              posts
            }
          });

          // For each tag in the post object, create a tag page.
          Object.keys(posts).forEach(tagName => {
            const post = posts[tagName];
            tagSlug = slugify(tagName, { lower: true });
            createPage({
              path: `/tags/${tagSlug}`,
              component: tagsTemplate,
              context: {
                posts,
                post,
                tag: tagName
              }
            });
          });
        };

        // Call createTagPages with the result of posts.
        createTagPages(createPage, posts);

        result.data.allMarkdownRemark.edges.map(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: postTemplate,
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: node.fields.slug,
              date: node.fields.date
            }
          });
        });
      })
    );
  });
};
