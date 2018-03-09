import React from "react";
import Link from "gatsby-link";

const slugify = require("slug");

export default function Tags({ pathContext }) {
  const { posts, post, tag } = pathContext;
  if (tag) {
    return (
      <div>
        <h1>
          {post.length} post{post.length === 1 ? "" : "s"} tagged with {tag}
        </h1>
        <ul>
          {post.map(({ id, frontmatter, excerpt, fields }) => {
            return (
              <li key={id}>
                <Link to={fields.slug}>
                  <h2>{frontmatter.title}</h2>
                  <p>{excerpt}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link to="/tags">All tags</Link>
      </div>
    );
  }
  return (
    <div>
      <h1>Tags</h1>
      <ul className="tags">
        {Object.keys(posts).map(tagName => {
          const tags = posts[tagName];
          return (
            <li key={tagName}>
              <Link to={`/tags/${tagName}`}>{tagName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
