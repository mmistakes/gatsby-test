import React from 'react'
import SkipLinks from './SkipLinks'

require('../css/global.css')
require('../css/prism.css')

// Load typefaces
require('typeface-alegreya')

export default ({ children }) => (
  <div>
    <SkipLinks />
    {children}
  </div>
)
