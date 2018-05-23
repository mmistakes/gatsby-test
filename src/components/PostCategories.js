import Link from 'gatsby-link'
import _ from 'lodash'
import React, { Component } from 'react'

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
            '@media(min-width: 768px)': {
              display: 'block',
            }
          }}
        >
          Filed in:
        </h3>
        {categories &&
          categories.map(category => (
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
                key={category}
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
