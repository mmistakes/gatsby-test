import Link from 'gatsby-link'
import React from 'react'

// Load typefaces
require('typeface-alegreya')

require('../utils/global.css')
require('../utils/prism.css')

class Template extends React.Component {
  render() {
    const { location, children } = this.props

    return (
      <div>
        {children()}
      </div>
    )
  }
}

export default Template
