import React from "react"
import { graphql } from "gatsby"
import Default from "../components/default"
import Post from "../components/post"
import SEO from "../components/seo"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import useSiteMetadata from '../utils/site-metadata';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();


const BlogPost = ({ path, data }) => {
  const { markdownRemark } = data
  const { siteUrl } = useSiteMetadata();

  let disqusConfig = {
    url: `${siteUrl}${path}`,
    identifier: `${siteUrl}${path}`,
    title: markdownRemark.frontmatter.title,
  }

  return (
    <>
    <SEO
      title={markdownRemark.frontmatter.title}
      description={markdownRemark.frontmatter.description}
      keywords={markdownRemark.frontmatter.keywords}
    />
    <Default></Default>
    <Post 
      title={markdownRemark.frontmatter.title} 
      date={markdownRemark.frontmatter.date} >
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />

      <CommentCount config={disqusConfig} placeholder={'...'} />
      <Disqus config={disqusConfig} />
    </Post>
    </>
  )
}

export default BlogPost

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        keywords
      }
    }
  }
`
