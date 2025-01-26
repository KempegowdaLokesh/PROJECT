import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./CastDetails.css";

const CastDetails = () => {
    const [castDetails, setCastDetails] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const { castId } = useParams(); // Cast ID from URL
    const image_url = "https://image.tmdb.org/t/p/original";
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch cast details
        fetch(`https://api.themoviedb.org/3/person/${castId}?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
            .then((res) => res.json())
            .then((data) => setCastDetails(data))
            .catch((error) => console.error('Error fetching cast details:', error));

        // Fetch related movies
        fetch(`https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=7ddeab7e9f7c99d207e10ac678bc4553`)
            .then((res) => res.json())
            .then((data) => setRelatedMovies(data.cast)) // Fetch all movies, no limit
            .catch((error) => console.error('Error fetching related movies:', error));
    }, [castId]);

    if (!castDetails) return <div>Loading...</div>;

    return (
        <div className="cast-details-container">
            {/* Cast Info */}
            <div className="cast-info">
                <img
                    src={castDetails.profile_path ? `${image_url}${castDetails.profile_path}` : 'https://via.placeholder.com/300'}
                    alt={castDetails.name}
                />
                <div className="cast-details">
                    <h1>{castDetails.name}</h1>
                    <p><strong>Biography:</strong> {castDetails.biography || 'No biography available.'}</p>
                    <p><strong>Birthday:</strong> {castDetails.birthday || 'N/A'}</p>
                    <p><strong>Place of Birth:</strong> {castDetails.place_of_birth || 'N/A'}</p>
                </div>
            </div>

            {/* Related Movies */}
            <div className="related-movies">
                <h2>Movies Featuring {castDetails.name}</h2>
                <div className="related-movies-list">
                    {relatedMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="related-movie-item"
                            onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to the movie page
                        >
                            <img
                                src={
                                    movie.poster_path
                                        ? `${image_url}${movie.poster_path}`
                                        : 'https://via.placeholder.com/150'
                                }
                                alt={movie.title}
                            />
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


   
export default CastDetails;
