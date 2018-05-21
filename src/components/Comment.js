import React from 'react'
import Gravatar from 'react-gravatar'

const Comment = props => {
  const { name, url, email, friendlyDate, iso8601Date, children } = props

  return (
    <article
      style={{
        display: 'flex',
        marginBottom: '10px',
      }}
    >
      <div
        style={{
          flexShrink: '0',
          marginRight: '20px',
        }}
      >
        <Gravatar size={60} md5={email} email={name} default="mm" rating="pg" />
      </div>
      <div>
        <header
          style={{
            marginBottom: '10px',
          }}
        >
          {url !== '' ? (
            <a className="h-card" href={url}>{name}</a>
          ) : (
            <span className="h-card">{name}</span>
          )}
          &nbsp;on <time dateTime={iso8601Date}>{friendlyDate}</time>
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
