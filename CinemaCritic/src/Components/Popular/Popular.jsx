import React from 'react'
import './Popular.css'
import poster1 from '../../assets/avatar.jpg'
import poster2 from '../../assets/avengers.jpg'
import poster3 from '../../assets/battleship.jpg'
import poster4 from '../../assets/civilwar.jpg'
import poster5 from '../../assets/csi.jpg'
import poster6 from '../../assets/giJoe.jpg'
import poster7 from '../../assets/hulk.jpg'
import poster8 from '../../assets/immortal.jpg'
import poster9 from '../../assets/leftbehind.jpg'
import poster10 from '../../assets/lifeofpie.jpg'
import poster11 from '../../assets/reacher.jpg'
import poster12 from '../../assets/rush.jpg'
import poster13 from '../../assets/thor.jpg'


const Popular = () => {

    const moviewPoster = [
        poster1,poster2,poster3,poster4,poster5,poster6,poster7,poster8,poster9,poster10,poster11,poster12,poster13];

  return (
    <div className='popular-container'>
        <p className='popular-heading'>Trending Now</p>
        <div className='popular-items'>
            {moviewPoster.map((poster,index)=>(
                <img src={poster} key={index} className='poster'/>
            ))}
        </div>
    </div>
  )
}

export default Popular