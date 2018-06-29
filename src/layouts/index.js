import React from 'react'
import SkipLinks from '../components/SkipLinks'

require('../css/global.css')
require('../css/prism.css')

// Load typefaces
require('typeface-alegreya')

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    return (
      <div>
        <SkipLinks />
        {children()}
      </div>
    )
  }
}

export default Template
