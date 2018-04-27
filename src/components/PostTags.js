import Link from 'gatsby-link'
import _ from 'lodash'
import React, { Component } from 'react'
import { rhythm } from '../utils/typography'

class PostTags extends Component {
  render() {
    const { tags } = this.props
    return (
      <div style={{ marginBottom: rhythm(1) }}>
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              style={{ textDecoration: 'none' }}
              to={`/tag/${_.kebabCase(tag)}/`}
            >
              <button>{tag}</button>
            </Link>
          ))}
      </div>
    )
  }
}

export default PostTags
