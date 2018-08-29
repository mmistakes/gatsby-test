import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Gravatar from 'react-gravatar'

const Comment = props => {
  const { name, url, email, friendlyDate, iso8601Date, children } = props

  return (
    <article
      css={{
        display: 'flex',
        marginBottom: '10px',
      }}
    >
      <div
        css={{
          flexShrink: '0',
          marginRight: '20px',
        }}
      >
        <Gravatar size={60} md5={email} email={name} default="mm" rating="pg" />
      </div>
      <div>
        <header
          css={{
            marginBottom: '10px',
          }}
        >
          {url !== '' ? (
            <a className="h-card" href={url}>
              {name}
            </a>
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

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  friendlyDate: PropTypes.string.isRequired,
  iso8601Date: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Comment

export const commentQuery = graphql`
  fragment commentAttributesFragment on MarkdownRemark {
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
