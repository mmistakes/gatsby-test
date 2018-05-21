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
          paddingTop: '5%',
          fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
        }}>
        <h3
          className="title"
          css={{
            marginBottom: 0,
            padding: 0,
            textTransform: 'uppercase',
          }}
        >
          Tagged
        </h3>
        {tags &&
          tags.map(tag => (
            <span
              css={{
                display: 'inline-block',
                marginRight: '10px',
              }}
            >
              <Link
                key={tag}
                to={`/tag/${_.kebabCase(tag)}/`}
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
