import React from "react"
import SEO from "../components/seo"
import Default from "../components/default"
import Post from "../components/post"
import { useStaticQuery, graphql } from "gatsby"


const ContactPage = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              formspree
            }
          }
        }
      }
    `
  )

  return(
	<>
	<SEO title="Contact" />
  	<Default/>
  	<Post title="Get in touch 📝">
  		<p>
       Get in touch through the contact form below or through any social media
  		</p>
    	<form className="form" action={site.siteMetadata.social.formspree} method="POST">
  			<div className="form-item">
      			<label className="contact-label" htmlFor="name">Name:</label>
      			<input type="text" placeholder="Your name" id="name" className="contact-input" name="name" required/>
  			</div>
		  	<div className="form-item">
		      	<label className="contact-label" htmlFor="email">Email:</label>
		      	<input type="email" placeholder="Your email" id="email" className="contact-input" name="_replyto" required/>
		  	</div>
		  	<div className="form-item">
		    	<label className="contact-label" htmlFor="message">Message:</label>
		    	<textarea placeholder="Your message" rows="4" id="message" className="contact-textarea contact-input" name="message" required></textarea>
		  	</div>
		  	<div className="form-item">
		    	<button type="submit" value="Send" className="form-btn">Send</button>
		  	</div>
		</form>
    </Post>
  	</>
  )
}

export default ContactPage
