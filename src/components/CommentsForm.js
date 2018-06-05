import React from 'react'
import config from '../../config/SiteConfig'

// Use the `path` (frontmatter) as the identifier for the post.
const CommentForm = ({ slug }) => {
  const slugDir = slug.replace(/^\/+|/g, ``)
  const successPage = `${config.siteUrl}/comment-success`

  return (
    <form
      method="POST"
      action="https://api.staticman.net/v2/entry/mmistakes/gatsby-test/master/comments"
    >
      <input name="options[redirect]" type="hidden" value={successPage} />
      <input name="options[parent]" type="hidden" value={slug} />
      <input name="options[slug]" type="hidden" value={slugDir} />

      <label
        htmlFor="name"
        css={{
          display: 'block',
        }}
      >
        Name
        <input id="name" name="fields[name]" type="text" required />
      </label>
      <label
        htmlFor="email"
        css={{
          display: 'block',
        }}
      >
        E-mail
        <input id="email" name="fields[email]" type="email" required />
      </label>
      <label
        htmlFor="website"
        css={{
          display: 'block',
        }}
      >
        Website
        <input id="website" name="fields[url]" type="text" />
      </label>
      <label
        htmlFor="message"
        css={{
          display: 'block',
        }}
      >
        Message
        <textarea id="message" name="fields[message]" required />
      </label>

      <button type="submit">Comment</button>
    </form>
  )
}

export default CommentForm
