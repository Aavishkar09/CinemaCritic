import React from 'react'
import './MovieCard.css'

const MovieCard = ({movieImage,movieName,rank,onClick}) => {
  return (
    <div className='movie-card' onClick={onClick}>
        { rank !== undefined && <div className="rank-overlay">{rank}</div>}
        <img src={movieImage} alt=''/>
    </div>
  )
}

export default MovieCard