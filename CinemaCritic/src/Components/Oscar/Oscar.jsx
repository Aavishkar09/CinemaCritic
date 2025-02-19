import React from 'react'
import './Oscar.css'
import poster1 from '../../assets/oppen.jpg'
import poster2 from '../../assets/evreything.jpg'
import poster3 from '../../assets/coda.jpg'
import poster4 from '../../assets/nomadland.jpg'
import poster5 from '../../assets/parasite.jpg'


const Oscar = () => {

    const oscarWining = [{
        oscarName:"Oppenheimer",
        year:"2024",
        image:poster1,
        rating:"8.3"
    },{
        oscarName:"Everything Everywhere All at Once",
        year:"2023",
        image:poster2,
        rating:"7.8",
    },{
        oscarName:"CODA",
        year:"2022",
        image:poster3,
        rating:"8.0",
    },{
        oscarName:"Nomadland",
        year:"2021",
        image:poster4,
        rating:"7.3",
    },{
        oscarName:"Parasite",
        year:"2020",
        image:poster5,
        rating:"8.5",
    },]

  return (
    <div className='oscar-container'>
        <p className='oscar-heading'>Oscars</p>
        <div className='oscar-items'>
            {
                oscarWining.map((oscar,index)=>(
                    <div className='oscar-card' key={index}>
                        <img src={oscar.image} className='oscar-image'/>
                        <div className='oscar-text'>
                            <p className='oscar-title'>{oscar.oscarName}</p>
                            <p className='oscar-year'>Year: {oscar.year}</p>
                            <p className='oscar-rating'>IMDb: {oscar.rating}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Oscar