import React from 'react'
import PropTypes from 'prop-types'
import PaginationLink from './PaginationLink'

class Pagination extends React.Component {
  render() {
    const { page, pages, prev, next } = this.props
    return (
      <nav className="pagination">
        <ul
          css={{
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

          <li>
            Page {page} of {pages}
          </li>

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

Pagination.defaultProps = {
  prev: null,
  next: null,
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  prev: PropTypes.string,
  next: PropTypes.string,
}

export default Pagination
