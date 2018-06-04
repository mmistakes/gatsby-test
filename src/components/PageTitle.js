import React from 'react'
import colors from '../utils/colors'
import fonts from '../utils/fonts'
import presets from '../utils/presets'
import Byline from '../components/Byline'

class PageTitle extends React.Component {
  render() {
    const { title, author } = this.props
    return (
      <div
        className="page__title"
        css={{
          [presets.mdUp]: {
            display: 'flex',
            minHeight: '300px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            gridColumn: '2 / span 4',
            gridRow: '3 / span 1',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 10,
          },
          [presets.lgUp]: {
            gridColumn: '2 / span 3',
          }
        }}
      >
        <h1
          className="headline"
          css={{
            alignSelf: 'flex-start',
            fontFamily: fonts.alternate,
            fontWeight: 700,
            fontSize: '1.953em',
            fontVariantLigatures: 'common-ligatures',
            fontFeatureSettings: '"kern" on, "liga" on, "clig" on, "calt" on, "frac" on',
            lineHeight: 1.25,
            textDecoration: 'underline',
            [presets.mdUp]: {
              paddingRight: '5%',
            },
            [presets.lgUp]: {
              fontSize: '2.441em',
            }
          }}
        >
          {title}
        </h1>
        <Byline author={author} />
      </div>
    )
  }
}

export default PageTitle
