import Link from 'gatsby-link'
import _ from 'lodash'
import React, { Component } from 'react'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

class PostTags extends Component {
  render() {
    const { tags } = this.props
    return (
      <div
        className="page__taxonomy"
        css={{
          paddingTop: '1em',
        }}
      >
        {tags ? (
          <h3
            className="title"
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
            Explore more:
          </h3>
        ) : (
          <div />
        )}

        {tags &&
          tags.map(tag => (
            <span
              key={tag}
              css={{
                display: 'inline-block',
                marginRight: '30px',
                fontFamily: fonts.monospace,
                fontSize: '0.8em',
                [presets.mdUp]: {
                  display: 'block',
                  '&::before': {
                    content: '"_"',
                  },
                },
              }}
            >
              <Link
                to={`/tag/${_.kebabCase(tag)}/`}
                css={{
                  textDecoration: 'none',
                }}
              >
                {tag}
              </Link>
            </span>
          ))}
      </div>
    )
  }
}

export default PostTags
