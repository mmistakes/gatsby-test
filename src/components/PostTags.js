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
          paddingTop: '2em',
        }}>
        <div
          className="title"
          css={{
            display: 'inline-block',
            marginBottom: 0,
            marginRight: '20px',
            padding: 0,
            fontStyle: 'italic',
            '@media(min-width: 768px)': {
              display: 'block',
            }
          }}
        >
          Explore More:
        </div>
        {tags &&
          tags.map(tag => (
            <span
              css={{
                display: 'inline-block',
                marginRight: '30px',
                fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
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
