import React from "react"
import SEO from "../components/seo"
import Default from "../components/default"
import BlogList from "../components/blogList"


const IndexPage = () => {

  return(
  <>
  	<SEO title="fresh"/>
    <Default></Default>
    <BlogList></BlogList>
  </>
  )
}

export default IndexPage