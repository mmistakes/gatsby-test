import React from "react";
import Link from "gatsby-link";
import kebabCase from "lodash/kebabcase";


export default function Tags({ list = [] }) {
  return (
    <ul className="tag-list">
      {list.map(tag => (
        <li key={tag}>
          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
}
