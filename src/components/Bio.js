import React from 'react'

import profilePic from '../assets/images/bio-photo.jpg'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: '60px',
        }}
      >
        <img
          src={profilePic}
          alt={`First Lastname`}
          style={{
            marginRight: '20px',
            marginBottom: 0,
            width: '75px',
            height: '75px',
          }}
        />
        <p>
          Written by <strong>First Lastname</strong> who is a blah blah blah...
        </p>
      </div>
    )
  }
}

export default Bio
