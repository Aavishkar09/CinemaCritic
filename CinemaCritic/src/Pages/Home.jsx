import React, { useEffect} from 'react'
import Hero from '../Components/Hero/Hero'
import Movies from '../Components/Movies/Movies'
import './Home.css'
import Trending from '../Components/Trending/Trending'
import { useLocation } from 'react-router-dom'

const Home = ({moviesRef}) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToMovies) {
      moviesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location, moviesRef]);

  return (
    <div className='home-page'>
        <Hero/>
        <Trending/>
        <div ref={moviesRef}>
          <Movies />
        </div>
    </div>
  )
}

export default Home