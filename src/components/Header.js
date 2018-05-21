import React from 'react'
import Link from 'gatsby-link'
import config from '../../config/SiteConfig'

class Header extends React.Component {
  render() {
    return (
      <header
        className="site__header"
        css={{
          '@media(min-width: 768px)': {
            gridColumn: 3,
            gridRow: 1,
            alignSelf: 'center',
          }
        }}
      >
        <div
          css={{
            fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
          }}
        >
          <Link className="site__name" to={'/'}>
            {config.title}
          </Link>
        </div>
      </header>
    )
  }
}

export default Header
