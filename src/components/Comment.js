import React from 'react'
import Gravatar from 'react-gravatar'
import { rhythm, scale } from '../utils/typography'

const Comment = props => {
  const { name, url, email, friendlyDate, iso8601Date, children } = props

  return (
    <article
      style={{
        display: 'flex',
        marginBottom: rhythm(1),
      }}
    >
      <div
        style={{
          flexShrink: '0',
          marginRight: rhythm(1),
        }}
      >
        <Gravatar size={60} md5={email} email={name} default="mm" rating="pg" />
      </div>
      <div>
        <header
          style={{
            marginBottom: rhythm(1/2),
          }}
        >
          <a className="h-card" href={url}>{name}</a>
          <time dateTime={iso8601Date}> on {friendlyDate}</time>
        </header>
        {children}
      </div>
    </article>
  )
}

export default Comment

export const commentQuery = graphql`
  fragment commentAttributesFragment on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      name
      url
      email
      uuid: date
      friendlyDate: date(formatString: "MMMM DD, YYYY")
      iso8601Date: date
    }
    html
  }
`
