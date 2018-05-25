import React from 'react'

// Use the `path` (frontmatter) as the identifier for the post.
const CommentForm = ({ slug }) => {
  return (
    <form method="POST" action="https://api.staticman.net/v2/entry/mmistakes/gatsby-test/master/comments">
      <input name="options[redirect]" type="hidden" value="/comments/success" />
      <input name="options[slug]" type="hidden" value={slug} />
      <input name="fields[type]" type="hidden" value="comment" />

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
