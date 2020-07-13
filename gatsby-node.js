/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    const [month, day, year] = new Date(node.frontmatter.date)
      .toLocaleDateString('en-EN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
    const slug = value.replace('/posts/', '').replace(/\/$/, '')
    const url = `${slug}`

    createNodeField({
      name: `slug`,
      node,
      value: url,
    })
  }
}

const path = require(`path`)

// 1. This is called once the data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
  // 1.1 Getting the method to create pages
  const { createPage } = actions
  // 1.2 Tell which layout Gatsby should use to thse pages
  const blogLayout = path.resolve(`./src/components/blogPost.js`)
  const blogListLayout = path.resolve(`./src/pages/index.js`)

  // 2 Return the method with the query
  return graphql(`
    query blogPosts {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date
              description
              keywords
            }
            html
          }
        }
      }
    }
  `).then(result => {
    // 2.1 Handle the errors
    if (result.errors) {
      console.error(result.errors)
      // reject(result.errors)
    }

    // 2.2 Our posts are here
    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 5
    const numPages = Math.ceil(posts.length / postsPerPage)

    // Creating blog list with pagination
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page/${i + 1}`,
        component: blogListLayout,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          numPages,
        },
      })
    })

    // 3 Loop throught all posts
    posts.forEach((post, index) => {
      // 3.1 Finally create posts
      createPage({
        path: post.node.fields.slug,
        component: blogLayout,
        context: {
          slug: post.node.fields.slug,
        },
      })
    })
  })
}