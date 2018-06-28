import React from 'react'
import PropTypes from 'prop-types'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

class Byline extends React.Component {
  render() {
    const { author } = this.props
    return (
      <div
        css={{
          marginBottom: '1em',
          alignSelf: 'flex-start',
          fontFamily: fonts.monospace,
          fontSize: '0.8em',
        }}
      >
        {author ? (
          <span
            className="byline"
            css={{
              '&::before': {
                content: '"__"',
              },
            }}
          >
            {author}
          </span>
        ) : (
          <span />
        )}
      </div>
    )
  }
}

Byline.propTypes = {
  author: PropTypes.string.isRequired,
}

export default Byline
