import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import OverlayMenuItems from '../components/OverlayMenuItems'

const OverlayMenu = ({ open, right, onClose }) => (
  <div
    className={classNames('overlay-menu', {
      'is-right': right,
      'is-open': open,
    })}
    css={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 100,
      '&.is-right .overlay-menu__wrap': {
        right: 0,
        transform: 'translateX(100%)',
      },
      '&.is-open .overlay-menu__overlay': {
        opacity: 1,
        pointerEvents: 'auto',
      },
      '&.is-open .overlay-menu__wrap': {
        transform: 'none',
        pointerEvents: 'auto',
        transition: 'transform 330ms ease-in',
      },
    }}
  >
    <div
      className="overlay-menu__overlay"
      onClick={onClose}
      role="presentation"
      css={{
        content: '""',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.4)',
        opacity: 0,
        willChange: 'opacity',
        pointerEvents: 'none',
        transition: 'opacity 0.3s cubic-bezier(0, 0, 0.3, 1)',
      }}
    />
    <nav
      className="overlay-menu__wrap"
      onClick={e => e.target.tagName.toLowerCase() === 'a' && onClose()}
      role="presentation"
      css={{
        padding: '1.5em',
        position: 'fixed',
        height: '100%',
        background: 'rgba(0, 0, 0, 1)',
        overflow: 'auto',
        transform: 'translateX(-100%)',
        willChange: 'transform',
        zIndex: 101,
        pointerEvents: 'auto',
        transition: 'transform 130ms ease-out',
      }}
    >
      <OverlayMenuItems />
    </nav>
  </div>
)

OverlayMenu.propTypes = {
  open: PropTypes.bool,
  right: PropTypes.bool,
  onClose: PropTypes.func,
}

OverlayMenu.defaultProps = {
  right: false,
  open: false,
  onClose: undefined,
}

export default OverlayMenu
