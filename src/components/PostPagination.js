import React from 'react'
import Link from 'gatsby-link'

class PostPagination extends React.Component {
  render() {
    const { previous, next } = this.props
    return (
      <nav
        className="page__pagination"
        css={{
          marginTop: '2em',
        }}
      >
        <ul
          css={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            '@media(max-width: 1023px)': {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            },
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
                dangerouslySetInnerHTML={{ __html: `←&nbsp;${previous.frontmatter.title}` }}
              />
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
                dangerouslySetInnerHTML={{ __html: `${next.frontmatter.title}&nbsp;→` }}
              />
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

export default PostPagination
