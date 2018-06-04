import React from 'react'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'

class Byline extends React.Component {
  render() {
    const { author } = this.props
    return (
      <div
        css={{
          alignSelf: 'flex-start',
          fontFamily: fonts.alternate,
          fontSize: '0.8em',
          [presets.mdUp]: {
            fontSize: '1.25em',
          }
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

export default Byline
