import React from "react";
import Gravatar from "react-gravatar";

const Comment = props => {
  const { name, url, email, friendlyDate, iso8601Date, message, children } = props;

  return (
    <div>
      <Gravatar size={60} md5={email} email={name} default="mm" />
      <header>
        <a className="h-card" href={url}>{name}</a>
        <time dateTime={iso8601Date}>{friendlyDate}</time>
      </header>
      {children}
      <hr />
    </div>
  );
};

export default Comment;

export const query = graphql`
  fragment commentAttributesFragment on MarkdownRemark {
    fields {
      slug
      template
    }
    frontmatter {
      name
      url
      email
      uuid: _id
      friendlyDate: date(formatString: "MMMM DD, YYYY @ h:mm A")
      iso8601Date: date
    }
    html
  }
`;
