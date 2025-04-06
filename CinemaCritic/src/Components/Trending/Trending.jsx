import React, { useRef } from 'react';
import './Trending.css';
import { useCategory } from '../../Context/CategoryContext';
import MovieCard from '../MovieCard/MovieCard';
import { useNavigate } from 'react-router-dom';
import MovieDetails from '../../Pages/MovieDetails/MovieDetails';

const Trending = () => {
    const { trendingData } = useCategory();
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    const handleMovieClick = (movieId) => {
        navigate(`movie/${movieId}`)
    }

    return (
        <div className="trending">
            <h2>Trending Now</h2>
            <div className="trending-wrapper">
                <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
                <div className="trending-container" ref={scrollRef}>
                    {trendingData.map((movie, id) => (
                        <MovieCard key={movie._id} movieImage={movie.image} movieName={movie.name} rank={id + 1} onClick={()=>handleMovieClick(movie._id)}/>
                    ))}
                </div>
                <button className="scroll-btn right" onClick={scrollRight}>›</button>
            </div>
            
        </div>
    );
};

export default Trending;
