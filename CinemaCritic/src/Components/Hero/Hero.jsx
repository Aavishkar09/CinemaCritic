import React, { useEffect, useState, useMemo } from 'react';
import './Hero.css';
import Button from '../Button/Button';
import play from '../../assets/play.svg';
import { useCategory } from '../../Context/CategoryContext';

const Hero = () => {
  const { data } = useCategory();
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectHeroMovie = useMemo(() => (
    ['Oppenheimer', 'The Dark Knight', 'Inception', 'Interstellar', 'Avatar']
  ), []);

  const hero = useMemo(() => {
    return data.filter((movie) => selectHeroMovie.includes(movie.name));
  }, [data, selectHeroMovie]);

  useEffect(() => {
    if (hero.length === 0) return;
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % hero.length);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [currentIndex, hero]);

  if (hero.length === 0) return <div>Loading...</div>;

  const currentMovie = hero[currentIndex];

  return (
    <div className="hero-container">
      <button className="nav-button left" onClick={() => setCurrentIndex((prev) => prev === 0 ? hero.length - 1 : prev - 1)}>&#10094;</button>
      
      <div className="hero-text">
        <h1>{currentMovie.name}</h1>
        <p className='hero-description'>{currentMovie.description}</p>
        <p>{currentMovie.genres?.join(' | ')}</p>
        <Button button_image={play} value='Watch now' />
      </div>
      
      <img src={currentMovie.posterImage} alt={currentMovie.name} className='hero-poster' />
      
      <button className="nav-button right" onClick={() => setCurrentIndex((prev) => (prev + 1) % hero.length)}>&#10095;</button>
    </div>
  );
};

export default Hero;
