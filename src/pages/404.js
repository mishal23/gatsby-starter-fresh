import React from "react"
import SEO from "../components/seo"
import Default from "../components/default"
import Post from "../components/post"


const NotFoundPage = () => (
  <>
	<SEO title="404: Page Not Found" />
  	<Default/>
  	<Post title="404 Page">
    	<p>Nothing found! Try again.</p>
    </Post>
  </>
)

export default NotFoundPage
