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

const createTagPages = (createPage, edges) => {
  // Tell it to use our tags template.
  const tagTemplate = path.resolve(`src/templates/tags.js`);
  // Create an empty object to store the posts.
  const posts = {};
  console.log("creating posts");

  // Loop through all nodes (our markdown posts) and add the tags to our post object.

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

  // Create the tags page with the list of tags from our posts object.
  createPage({
    path: "/tags",
    component: tagTemplate,
    context: {
      posts
    }
  });

  // For each of the tags in the post object, create a tag page.

  Object.keys(posts).forEach(tagName => {
    const post = posts[tagName];
    tagSlug = slugify(tagName, { lower: true });
    createPage({
      path: `/tags/${tagSlug}`,
      component: tagTemplate,
      context: {
        posts,
        post,
        tag: tagName
      }
    });
  });
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
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
    `).then(result => {
      const posts = result.data.allMarkdownRemark.edges;

      // call createTagPages with the result of posts
      createTagPages(createPage, posts);

      result.data.allMarkdownRemark.edges.map(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            date: node.fields.date
          }
        });
      });
      resolve();
    });
  });
};
