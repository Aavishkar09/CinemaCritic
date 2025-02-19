import React from 'react'
import './Items.css'
import poster1 from '../../assets/thor.jpg'

const Items = (props) => {
  return (
        <div className="movie-card">
            <img src={props.poster} alt="Thor 3"/>
            <p className="rating">{props.rating} ⭐</p>
            <h3>{props.name}</h3>
            <p className="genre">{props.year}</p>
        </div>
  )
}

export default Items