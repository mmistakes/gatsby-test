import React from 'react'
import Link from 'gatsby-link'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

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
        <h3
          css={{
            display: 'inline-block',
            marginTop: 0,
            marginRight: '20px',
            marginBottom: '10px',
            padding: 0,
            fontSize: '0.8em',
            [presets.mdUp]: {
              display: 'block',
            },
          }}
        >
          Related:
        </h3>
        <ul
          css={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            fontFamily: fonts.monospace,
            fontSize: '0.8em',
            [presets.lgDown]: {
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
                  textDecoration: 'none',
                  [presets.mdUp]: {
                    '&::before': {
                      content: '"_"',
                    },
                  },
                }}
              >
                {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link
                to={next.fields.slug}
                rel="next"
                css={{
                  textDecoration: 'none',
                  [presets.mdUp]: {
                    '&::before': {
                      content: '"_"',
                    },
                  },
                }}
              >
                {next.frontmatter.title}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

export default PostPagination
