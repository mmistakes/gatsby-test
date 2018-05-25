import React from 'react'
import config from '../../config/SiteConfig'

// Use the `path` (frontmatter) as the identifier for the post.
const CommentForm = ({ slug }) => {
  const slugDir = slug.replace(/^\/+|/g, ``)
  const successPage = `${config.siteUrl}/comment-success`

  return (
    <form method="POST" action="https://api.staticman.net/v2/entry/mmistakes/gatsby-test/master/comments">
      <input name="options[redirect]" type="hidden" value={successPage} />
      <input name="options[slug]" type="hidden" value={slugDir} />
      <input name="options[type]" type="hidden" value="comment" />

      <label
        css={{
          display: 'block',
        }}
      >
        Name
        <input name="fields[name]" type="text" required />
      </label>
      <label
        css={{
          display: 'block',
        }}
      >
        E-mail
        <input name="fields[email]" type="email" required />
      </label>
      <label
        css={{
          display: 'block',
        }}
      >
        Website
        <input name="fields[url]" type="text" required />
      </label>
      <label
        css={{
          display: 'block',
        }}
      >
        Message
        <textarea name="fields[message]" required />
      </label>

      <button type="submit">Comment</button>
    </form>
  );
};

export default CommentForm;
