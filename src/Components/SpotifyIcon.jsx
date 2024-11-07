import React from 'react'

function SpotifyIcon({ imageUrl, name, followers }) {
  return (
    <div className='icon'>
      <img src={imageUrl} alt="" href='https://open.spotify.com/' />
      <h2>{name}</h2>
      <p>{followers}</p>
    </div>
  )
}

export default SpotifyIcon