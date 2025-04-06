import React from 'react'
import './Items.css'

const Items = (props) => {
  return (
        <div className="movie-cardd">
            <img src={props.poster} alt=""/>
            <p className="rating">{props.rating} ⭐</p>
            <h3>{props.name}</h3>
            <p className="genre">{props.year}</p>
        </div>
  )
}

export default Items