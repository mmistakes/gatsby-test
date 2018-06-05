import React from 'react'

require('../css/global.css')
require('../css/prism.css')

// Load typefaces
require('typeface-alegreya')

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    return <div>{children()}</div>
  }
}

export default Template
