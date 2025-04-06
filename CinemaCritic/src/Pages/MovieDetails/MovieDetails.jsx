import React, { useEffect } from 'react';
import './MovieDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategory } from '../../Context/CategoryContext';
import MovieInfo from '../../Components/MovieInfo/MovieInfo';
import MovieCard from '../../Components/MovieCard/MovieCard';

const MovieDetails = () => {
    const { id } = useParams();
    const { data } = useCategory();
    const navigate = useNavigate();

    const movieDetail = data.find(movie => movie._id === id);

    if (!movieDetail) {
        return <h2>Loading...</h2>;
    }

    const similarMovies = data
        .filter(movies =>
            movies._id !== movieDetail._id &&
            movies.genres.some(genre => movieDetail.genres.includes(genre))
        )
        .sort((a, b) => b.views - a.views)
        .slice(0, 6);

    const handleClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className='movie'>
            <MovieInfo movie={movieDetail} />
            <div className='movies-similar'>
                <h2>Similar movies: </h2>
                <div className='movies-similar-wrapper'>
                    {similarMovies.map((movies) => (
                        <MovieCard
                            key={movies._id}
                            movieImage={movies.image}
                            onClick={() => handleClick(movies._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
