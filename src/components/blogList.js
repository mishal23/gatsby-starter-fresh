import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"


const BlogList = () => {
  const data = useStaticQuery(
  graphql`
  query BlogList {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {blog: {eq: true}}} 
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`
)
  const { allMarkdownRemark } = data
  
  return(
  <>
    <main role="main">
      <div className="content">
        {allMarkdownRemark.edges.map(({ node }) => (
          <article className="main-article">
            <div className="wrap-content">
              <header className="header-article">
                <h2 className="title-article"><Link to={node.fields.slug}>{node.frontmatter.title}</Link></h2>
                <div className="post-date"><span>{node.frontmatter.date}&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
              </header>
              <p>{node.frontmatter.description} <Link to={node.fields.slug}>(Read more ...)</Link></p>
            </div>
          </article>
        ))}
      </div>
    </main>
  </>
  )
}

export default BlogList
