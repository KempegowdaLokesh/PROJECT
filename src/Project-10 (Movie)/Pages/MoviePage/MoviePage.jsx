import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Youtube from "react-youtube";
import "./MoviePage.css";

const MoviePage = () => {
    const [specificMovie, setSpecificMovie] = useState({});
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const navigate = useNavigate();
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
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
        // Fetch movie details
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
            .then((res) => res.json())
            .then((data) => setSpecificMovie(data))
            .catch((error) => console.error('Error fetching movie data:', error));

        // Fetch cast
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
            .then((res) => res.json())
            .then((data) => setCast(data.cast.slice(0, 10)))
            .catch((error) => console.error('Error fetching cast:', error));
    }, [id]);

    const fetchTrailer = (movieId) => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
            .then((res) => res.json())
            .then((data) => {
                if (data.results && data.results.length > 0) {
                    setTrailer(data.results[0]?.key);
                    setIsTrailerOpen(true);
                } else {
                    alert('No trailer available for this movie.');
                }
            })
            .catch((error) => {
                console.error('Error fetching trailer:', error);
                alert('Error fetching trailer.');
            });
    };

    const closeTrailer = () => {
        setIsTrailerOpen(false);
        setTrailer(null);
    };

    return (
        <div className="movie-container">
            {/* Movie Poster and Details */}
            <div className="movie-images">
                <center>
                    {specificMovie?.backdrop_path ? (
                        <img
                            src={`${image_url}${specificMovie.backdrop_path}`}
                            alt={specificMovie.original_title || 'Movie Image'}
                        />
                    ) : (
                        <p>Loading image...</p>
                    )}
                </center>
            </div>
            <div className="movie-info">
                <h1>{specificMovie?.original_title || 'Loading...'}</h1>
                <p>{specificMovie?.overview || 'No description available.'}</p>
                
                {/* Genre */}
                <p><strong>Genres:</strong> {specificMovie?.genres?.map((genre) => genre.name).join(", ") || 'N/A'}</p>
                
                {/* Release Date */}
                <p><strong>Release Date:</strong> {specificMovie?.release_date || 'N/A'}</p>
                
                <p>
                    <strong>Rating:</strong> {specificMovie?.vote_average || 'N/A'}
                </p>
                <button className="trailer-button" onClick={() => fetchTrailer(id)}>
                    Watch Trailer
                </button>
            </div>

            {/* Cast Section */}
            <div className="movie-cast">
                <h2>Cast</h2>
                <div className="cast-list">
                    {cast.map((actor) => (
                        <div
                            key={actor.id}
                            className="cast-item"
                            onClick={() => navigate(`/cast/${actor.id}`)} // Navigate to CastDetails
                        >
                            <img
                                src={
                                    actor.profile_path
                                        ? `${image_url}${actor.profile_path}`
                                        : 'https://via.placeholder.com/150'
                                }
                                alt={actor.name}
                            />
                            <p className="cast-name">{actor.name}</p>
                            <p className="cast-character">as {actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trailer Modal */}
            {isTrailerOpen && (
                <div className="trailer-modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeTrailer}>
                            Close
                        </button>
                        {trailer && <Youtube videoId={trailer} opts={opts} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoviePage;
