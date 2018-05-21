import React from 'react'
import Link from 'gatsby-link'

class PostPagination extends React.Component {
  render() {
    const { previous, next } = this.props
    return (
      <nav
        className="page__pagination"
        css={{
          marginTop: '10%',
        }}
      >
        <ul
          css={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {previous && (
            <li>
              <Link
                to={previous.fields.slug}
                rel="prev"
                css={{
                  textDecoration: 'none'
                }}
              >
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link
                to={next.fields.slug}
                rel="next"
                css={{
                  textDecoration: 'none'
                }}
              >
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

export default PostPagination
