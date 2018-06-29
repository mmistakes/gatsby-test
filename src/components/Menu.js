
import React from 'react'
import OverlayMenu from '../components/OverlayMenu'
import config from '../../config/SiteConfig'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false, right: true }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <div
        className="menu"
        css={{
          [presets.mdUp]: {
            gridColumn: '7 / 9',
            gridRow: 1,
            alignSelf: 'center',
            justifySelf: 'end',
          },
          [presets.lgUp]: {
            gridColumn: 8,
          },
        }}
      >
        <button
          type="button"
          onClick={this.toggleMenu}
          css={{
            position: 'relative',
            marginTop: '1em',
            marginBottom: '1em',
            fontFamily: fonts.monospace,
            fontSize: '1em',
            zIndex: 50,
            cursor: 'point',
          }}
        >
          Open menu
        </button>
        <OverlayMenu
          open={this.state.isOpen}
          onClose={this.toggleMenu}
          right={this.state.right}
        />
      </div>
    )
  }
}

export default Menu
