import React from 'react'
import Link from 'gatsby-link'
import config from '../../config/SiteConfig'

class Header extends React.Component {
  render() {
    return (
      <header
        className="site__header"
        css={{
          marginTop: '1em',
          marginBottom: '1em',
          '@media(min-width: 768px)': {
            gridColumn: '3 / 5',
            gridRow: 1,
            alignSelf: 'center',
          },
          '@media(min-width: 1024px)': {
            gridColumn: 3,
          }
        }}
      >
        <div
          css={{
            fontFamily: '"Inconsolata", monospace',
          }}
        >
          <Link
            className="site__name"
            css={{
              color: '#000',
              textDecoration: 'none',
            }}
            to={'/'}
          >
            {config.title}
          </Link>
        </div>
      </header>
    )
  }
}

export default Header
