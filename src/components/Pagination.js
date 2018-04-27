import React from 'react'
import PaginationLink from './PaginationLink'

class Pagination extends React.Component {
  render() {
    const { page, pages, prev, next } = this.props
    return (
      <nav className="pagination">
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {prev && (
            <li>
              <PaginationLink
                className="newer-posts"
                url={prev}
                text="← Newer Posts"
              />
            </li>
          )}

          <li>Page {page} of {pages}</li>

          {next && (
            <li>
              <PaginationLink
                className="older-posts"
                url={next}
                text="Older Posts →"
              />
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

export default Pagination
