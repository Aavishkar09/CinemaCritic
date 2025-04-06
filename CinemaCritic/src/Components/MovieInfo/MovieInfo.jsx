import React from 'react'
import Button from '../Button/Button'
import play from '../../assets/play.svg'
import './MovieInfo.css'
import star from '../../assets/star-solid.svg'

const MovieInfo = ({movie}) => {
  return (
    <div className='movie-information-container'>
        <div className='movie-information-text'>
            <h1>{movie.name}</h1>
            <p>{movie.description}</p>
            <p>{movie.genres.join(' | ')}</p>
            <p><img src={star} alt='' className='star'/> {movie.rating}/10</p>
            <Button button_image={play} value='Watch now'/>
            <img />
        </div>
        <img src={movie.posterImage} alt='' className='poster'/>
        <img src={movie.image} alt='' className='extra-image' />
    </div>
  )
}

export default MovieInfo