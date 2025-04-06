import React from 'react'
import './Button.css'

const Button = ({button_image,value}) => {
  return (
    <button className='button'>
        <img src={button_image} alt=''/>
        {value}
    </button>
  )
}

export default Button