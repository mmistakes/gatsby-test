import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import Tags from "../components/Tags";

const Posts = ({ posts }) => (
  <div>
    {posts.filter(post => post.frontmatter.title.length > 0).map((post, index) => (
      <article key={index}>
        <header>
          <h2><Link to={post.fields.slug}>{post.frontmatter.title}</Link></h2>
          <time dateTime={post.fields.date}>{post.fields.date}</time>
        </header>
        <section>
          <p>{post.excerpt} <Link to={post.fields.slug}>&raquo;</Link></p>
        </section>
        <footer>
          <Tags list={post.frontmatter.tags || []} />
        </footer>
      </article>
    ))}
  </div>
);

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

export default Posts;
