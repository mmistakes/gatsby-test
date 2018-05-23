import Link from 'gatsby-link'
import _ from 'lodash'
import React, { Component } from 'react'

class PostTags extends Component {
  render() {
    const { tags } = this.props
    return (
      <div
        className="page__taxonomy"
        css={{
          paddingTop: '1em',
        }}>
        <h3
          className="title"
          css={{
            display: 'inline-block',
            marginTop: 0,
            marginRight: '20px',
            marginBottom: '10px',
            padding: 0,
            fontSize: '0.8em',
            '@media(min-width: 768px)': {
              display: 'block',
            }
          }}
        >
          Explore more:
        </h3>
        {tags &&
          tags.map(tag => (
            <span
              css={{
                display: 'inline-block',
                marginRight: '30px',
                fontFamily: '"Inconsolata", monospace',
                fontSize: '0.8em',
                '@media(min-width: 768px)': {
                  display: 'block',
                  '&::before': {
                    content: '"_"',
                  },
                }
              }}
            >
              <Link
                key={tag}
                to={`/tag/${_.kebabCase(tag)}/`}
                css={{
                  textDecoration: 'none'
                }}
              >
                {tag}
              </Link>
            </span>
          ))
        }
      </div>
    )
  }
}

export default PostTags
