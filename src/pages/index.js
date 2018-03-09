import React from "react";
import Link from "gatsby-link";
import Tags from "../components/tags";

// const IndexPage = ({ data }) => (
//   <div>
//     <h1>My Travel Blog</h1>
//     {data.allMarkdownRemark.edges.map(({ node }) => (
//       <div key={node.id}>
//         <h3>
//           <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
//           <span>— {node.frontmatter.tags.join(`, `)}</span>
//         </h3>
//       </div>
//     ))}
//   </div>
// );

// export const query = graphql`
//   query IndexQuery {
//     allMarkdownRemark {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             tags
//           }
//         }
//       }
//     }
//   }
// `;

export default ({ data }) => {
  return (
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <article key={node.id}>
          <header>
            <Link to={node.fields.slug}>{node.frontmatter.title} </Link>
            <div>{node.fields.date}</div>
          </header>
          <section>
            <p>{node.excerpt}</p>
            <footer>
              <Tags list={node.frontmatter.tags || []} />
            </footer>
          </section>
        </article>
      ))}
    </div>
  );
};

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
            tags
          }
          fields {
            slug
            date
          }
          excerpt
        }
      }
    }
  }
`;
