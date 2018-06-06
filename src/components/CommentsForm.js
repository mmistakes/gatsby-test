import React from 'react'
import config from '../../config/SiteConfig'
import presets from '../utils/presets'
import fonts from '../utils/fonts'

// Use the `path` (frontmatter) as the identifier for the post.
const CommentForm = ({ slug }) => {
  const slugDir = slug.replace(/^\/+|/g, ``)
  const successPage = `${config.siteUrl}/comment-success`

  return (
    <div>
      <h2>Leave a Comment</h2>
      <form
        method="POST"
        action="https://api.staticman.net/v2/entry/mmistakes/gatsby-test/master/comments"
        css={{
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        <input name="options[redirect]" type="hidden" value={successPage} />
        <input name="options[parent]" type="hidden" value={slug} />
        <input name="options[slug]" type="hidden" value={slugDir} />
        <div
          css={{
            [presets.lgUp]: {
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              margin: '0 -0.5em 1em',
            },
          }}
        >
          <label
            htmlFor="name"
            css={{
              display: 'block',
              margin: '0 0 0.25em 0',
              paddingLeft: '0.5em',
              paddingRight: '0.5em',
              fontFamily: fonts.monospace,
              textTransform: 'uppercase',
            }}
          >
            Name
            <input
              id="name"
              name="fields[name]"
              type="text"
              required
              css={{
                display: 'block',
                boxSizing: 'border-box',
                width: '100%',
                margin: '0',
                padding: '0.5em',
                verticalAlign: 'top',
                overflow: 'visible',
                fontFamily: fonts.sansSerif,
                fontSize: '1em',
                background: '#fff',
                border: '1px solid rgba(0,0,0, 0.25)',
                borderRadius: '0.25em',
              }}
            />
          </label>
          <label
            htmlFor="email"
            css={{
              display: 'block',
              margin: '0 0 0.25em 0',
              paddingLeft: '0.5em',
              paddingRight: '0.5em',
              fontFamily: fonts.monospace,
              textTransform: 'uppercase',
            }}
          >
            E-mail
            <input
              id="email"
              name="fields[email]"
              type="email"
              required
              css={{
                display: 'block',
                boxSizing: 'border-box',
                width: '100%',
                margin: '0',
                padding: '0.5em',
                verticalAlign: 'top',
                overflow: 'visible',
                fontFamily: fonts.sansSerif,
                fontSize: '1em',
                background: '#fff',
                border: '1px solid rgba(0,0,0, 0.25)',
                borderRadius: '0.25em',
              }}
            />
          </label>
          <label
            htmlFor="website"
            css={{
              display: 'block',
              margin: '0 0 0.25em 0',
              paddingLeft: '0.5em',
              paddingRight: '0.5em',
              fontFamily: fonts.monospace,
              textTransform: 'uppercase',
            }}
          >
            Website
            <input
              id="website"
              name="fields[url]"
              type="text"
              css={{
                display: 'block',
                boxSizing: 'border-box',
                width: '100%',
                margin: '0',
                padding: '0.5em',
                verticalAlign: 'top',
                overflow: 'visible',
                fontFamily: fonts.sansSerif,
                fontSize: '1em',
                background: '#fff',
                border: '1px solid rgba(0,0,0, 0.25)',
                borderRadius: '0.25em',
              }}
            />
          </label>
        </div>
        <div css={{ marginBottom: '1em' }}>
          <label
            htmlFor="message"
            css={{
              display: 'block',
              margin: '0 0 0.25em 0',
              fontFamily: fonts.monospace,
              textTransform: 'uppercase',
            }}
          >
            Message
            <textarea
              id="message"
              name="fields[message]"
              rows="6"
              required
              css={{
                display: 'block',
                boxSizing: 'border-box',
                width: '100%',
                margin: '0',
                padding: '0.5em',
                verticalAlign: 'top',
                overflow: 'visible',
                fontFamily: fonts.sansSerif,
                fontSize: '1em',
                background: '#fff',
                border: '1px solid rgba(0,0,0, 0.25)',
                borderRadius: '0.25em',
              }}
            />
          </label>
        </div>
        <button type="submit">Comment</button>
      </form>
    </div>
  )
}

export default CommentForm
