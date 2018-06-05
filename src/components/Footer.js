import React from 'react'
import config from '../../config/SiteConfig'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

class Footer extends React.Component {
  render() {
    return (
      <footer
        className="site__footer"
        css={{
          marginTop: '3em',
          marginBottom: '2em',
          fontFamily: fonts.monospace,
          [presets.mdUp]: {
            gridColumn: '3 / 8',
            gridRow: '7 / span 1',
            alignSelf: 'center',
          },
        }}
      >
        &copy; Copyright {config.title}
      </footer>
    )
  }
}

export default Footer
