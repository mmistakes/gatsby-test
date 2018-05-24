import React from 'react'
import Link from 'gatsby-link'
import config from '../../config/SiteConfig'
import presets, { colors } from '../utils/presets'

class Header extends React.Component {
  render() {
    return (
      <header
        className="site__header"
        css={{
          marginTop: '1em',
          marginBottom: '1em',
          [presets.mdUp]: {
            gridColumn: '3 / 5',
            gridRow: 1,
            alignSelf: 'center',
          },
          [presets.lgUp]: {
            gridColumn: 3,
          }
        }}
      >
        <div
          css={{
            fontFamily: 'Menlo, Consolas, Monaco, "Courier New", Courier, monospace',
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
