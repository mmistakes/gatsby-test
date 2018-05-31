import Link from 'gatsby-link'
import _ from 'lodash'
import React, { Component } from 'react'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

class PostCategories extends Component {
  render() {
    const { categories } = this.props
    return (
      <div
        className="page__taxonomy"
        css={{
          paddingTop: '2em',
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
            [presets.mdUp]: {
              display: 'block',
            }
          }}
        >
          Filed in:
        </h3>
        {categories &&
          categories.map(category => (
            <span
              key={category}
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
                }
              }}
            >
              <Link
                to={`/${_.kebabCase(category)}/`}
                css={{
                  textDecoration: 'none'
                }}
              >
                {category}
              </Link>
            </span>
          ))
        }
      </div>
    )
  }
}

export default PostCategories
