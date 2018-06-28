import Link from 'gatsby-link'
import React from 'react'

class OverlayMenuItems extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <Link to="/category/">All Categories</Link>
        </li>
        <li>
          <Link to="/tag/">All Tags</Link>
        </li>
        <li>
          <Link to="/grid-example/">Grid Example</Link>
        </li>
      </ul>
    )
  }
}

export default OverlayMenuItems
