import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import React from 'react'

class OverlayMenuItems extends React.Component {
  handleClick = e => {
    e.onClose()
  }

  render() {
    return (
      <ul
        css={{
          padding: 0,
          margin: 0,
          listStyle: 'none',
          '& a': {
            color: '#fff',
          }
        }}
      >
        <li>
          <Link
            to="/category/"
          >
            All Categories
          </Link>
        </li>
        <li>
          <Link
            onClick={this.handleClick}
            to="/tag/"
          >
            All Tags
          </Link>
        </li>
        <li>
          <Link
            onClick={this.handleClick}
            to="/grid-example/"
          >
            Grid Example
          </Link>
        </li>
      </ul>
    )
  }
}

OverlayMenuItems.propTypes = {
  onClose: PropTypes.func,
}

OverlayMenuItems.defaultProps = {
  onClose: undefined,
}

export default OverlayMenuItems
