import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Youtube from "react-youtube";
// import "./index.css";

const MoviePage = () => {
    const [specificMovie, setSpecificMovie] = useState({});
    const [trailer, setTrailer] = useState(null);
    const { id } = useParams();
    const image_url = "https://image.tmdb.org/t/p/original";

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
        autoplay: 1,
        },
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
            .then((res) => res.json())
            .then((data) => setSpecificMovie(data))
            .catch((error) => console.error('Error fetching movie data:', error));
    }, [id]);

    const fetchTrailer = (movieId) => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
            .then((res) => res.json())
            .then((data) => setTrailer(data.results[0]?.key))
            .catch((error) => console.error('Error fetching trailer:', error));
    };

    return (
        <div className="movie-container">
            <div className="movie-images">
                {specificMovie?.backdrop_path ? (
                    <img
                        src={`${image_url}${ specificMovie.backdrop_path}`}
                        alt={specificMovie.original_title || 'Movie Image'}
                    />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
            <div className="movie-info">
                <h1>{specificMovie?.original_title || 'Loading...'}</h1>
                <p>{specificMovie?.overview || 'No description available.'}</p>
                <p><strong>Rating:</strong> {specificMovie?.vote_average || 'N/A'}</p>
                <button onClick={() => fetchTrailer(id)}>Watch Trailer</button>
                {trailer ? (
                    <Youtube videoId={trailer} opts={opts} />
                ) : (
                    trailer === null ? null : <p>No trailer available</p>
                )}
            </div>
        </div>
    );
};

export default MoviePage;
