const fs = require(`fs-extra`);
const path = require(`path`);
const slugify = require(`slug`);
const kebabCase = require(`lodash/kebabcase`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { createPaginationPages } = require(`gatsby-pagination`);

// Calculate post defaults.
const calculateDefaults = (node, getNode) => {
  const defaultSlug = createFilePath({ node, getNode, basePath: `pages` })
  const isPostShaped = defaultSlug.match(
    /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
  )

  if (isPostShaped) {
    const [, defaultDate, defaultTitle] = isPostShaped
    return [defaultSlug, defaultTitle, defaultDate]
  } else {
    const [, defaultTitle] = defaultSlug.match(/^\/(.*)\/$/)
    const defaultDate = '1980-01-01'
    return [defaultSlug, defaultTitle, defaultDate]
  }
}

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    try {
      if (node.frontmatter.template === `comment`) {
        createNodeField({ node, name: `template`, value: `comment` })
        createNodeField({ node, name: `slug`, value: node.frontmatter.slug })
      } else {
        const [defaultSlug, defaultTitle, defaultDate] = calculateDefaults(
          node,
          getNode
        )

        const slug = node.frontmatter.slug || defaultSlug
        const date = node.frontmatter.date || defaultDate
        const title = defaultTitle
        const template = node.frontmatter.template || 'post'

        const { categories } = node.frontmatter;
        // const slug = createFilePath({ node, getNode, basePath: `pages` });
        // const [, date, title] = slug.match(
        //   /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
        // );
        // const value = `/${slugify(categories.concat([date]).join('-'), '/')}/${title}/`
        if (categories) {
          categoriesPath = categories
            .join("/")
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .replace(/\s+/g, "-")
            .toLowerCase();
          value = `/${categoriesPath}/${title}/`;
        } else {
          const value = `/${title}/`;
        }

        createNodeField({ node, name: `slug`, value: value });
        createNodeField({ node, name: `date`, value: date });
        createNodeField({ node, name: `title`, value: title })
        createNodeField({ node, name: `template`, value: template })
      }
    } catch (ex) {
      console.log('Error onCreateNode():', node.fileAbsolutePath, '\n', ex)
      throw ex
    }
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  // Fetch posts.
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            excerpt
            id
            fields {
              slug
              date
            }
            frontmatter {
              title
              categories
              tags
            }
          }
        }
      }
    }
  `).then(result => generateContent(createPage, result));
};

// Create posts pages.
function generateContent(createPage, graphqlResults) {
  if (graphqlResults.errors) {
    return Promise.reject(graphqlResults.errors);
  }

  const postTemplate = path.resolve(`./src/templates/post.js`);

  // Separate published posts and drafts.
  const posts = graphqlResults.data.allMarkdownRemark.edges;
  const published = posts.filter(post => !post.node.frontmatter.draft);
  const drafts = posts.filter(post => post.node.frontmatter.draft);

  createTagPages(createPage, published);
  createPagination(createPage, published, `/page`);
  createPagination(createPage, drafts, `/drafts/page`);

  // Create pages for each Markdown file.
  posts.forEach(({ node }, index) => {
    const prev = index === 0 ? false : posts[index - 1].node;
    const next = index === posts.length - 1 ? false : posts[index + 1].node;

    createPage({
      path: node.fields.slug,
      component: postTemplate,
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: node.fields.slug,
        date: node.fields.date,
        prev,
        next
      }
    });
  });
}

// Create pages for tags.
function createTagPages(createPage, edges) {
  const tagTemplate = path.resolve(`./src/templates/tags.js`);
  const posts = {};

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

  Object.keys(posts).forEach(tagName => {
    const pageSize = 5;
    const pagesSum = Math.ceil(posts[tagName].length / pageSize);

    for (let page = 1; page <= pagesSum; page++) {
      createPage({
        path:
          page === 1
          ? `/tag/${kebabCase(tagName)}`
          : `/tag/${kebabCase(tagName)}/page/${page}`,
        component: tagTemplate,
        context: {
          posts: paginate(posts[tagName], pageSize, page),
          tag: tagName,
          pagesSum,
          page,
        },
      });
    }
  });
}

// Create pagination for posts
function createPagination(createPage, edges, pathPrefix) {
  const pageTemplate = path.resolve(`./src/templates/page.js`);

  const pageSize = 10;
  const pagesSum = Math.ceil(edges.length / pageSize);

  for (let page = 1; page <= pagesSum; page++) {
    createPage({
      path: `${pathPrefix}/${page}`,
      component: pageTemplate,
      context: {
        posts: paginate(edges, pageSize, page).map(({ node }) => node),
        page,
        pagesSum,
        prevPath: page - 1 > 0 ? `${pathPrefix}/${page - 1}` : null,
        nextPath: page + 1 <= pagesSum ? `${pathPrefix}/${page + 1}` : null,
      },
    });
  }
}

function paginate(array, page_size, page_number) {
  return array.slice(0).slice((page_number - 1) * page_size, page_number * page_size);
}
