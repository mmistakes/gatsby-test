import Link from 'gatsby-link'
import React from 'react'

// Load Playfair Display typeface
require('typeface-playfair-display')

require('../utils/global.css')
require('prismjs/themes/prism.css')
require('../utils/gatsby-highlight-code-line.css')

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
