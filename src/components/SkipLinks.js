import { Link } from 'gatsby'
import React from 'react'

class SkipLinks extends React.Component {
  render() {
    return (
      <Link
        to="#main"
        css={{
          position: 'absolute',
          top: '-2em',
          right: '0.7rem',
          '&:focus': {
            top: '0.75rem',
          }
        }}
      >
        skip to content
      </Link>
    )
  }
}

export default SkipLinks
