import React from 'react'
import config from '../../config/SiteConfig'

class Footer extends React.Component {
  render() {
    return (
      <footer
        className="site__footer"
        css={{
          fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
          '@media(min-width: 768px)': {
            gridColumn: '3 / 8',
            gridRow: '7 / span 1',
            alignSelf: 'center',
          }
        }}
      >
        &copy; Copyright {config.title}
      </footer>
    )
  }
}

export default Footer