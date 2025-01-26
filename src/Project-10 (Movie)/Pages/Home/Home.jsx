import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Home.css';
import Pagination from '../../Components/Pagination/Pagination'; // Import the Pagination component
import Card from '../../Components/Card/Card'; // Import the Card component

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const api_key = "7ddeab7e9f7c99d207e10ac678bc4553";
  const Base_Url = "https://api.themoviedb.org/3";
  const image_url = "https://image.tmdb.org/t/p/original";

  const location = useLocation(); // Get the current URL location
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || ""; // Get the `search` query from URL

  const fetchMovies = async (query = "", page = 1) => {
    try {
      const endpoint = query
        ? `${Base_Url}/search/movie`
        : `${Base_Url}/discover/movie`;

      const params = {
        api_key,
        page,
        ...(query && { query }),
      };

      const response = await axios.get(endpoint, { params });
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Fetch movies whenever the search query or currentPage changes
  useEffect(() => {
    fetchMovies(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="home-container">
      <h1>Movie Search and Discovery</h1>

      {/* Movie list */}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((item) => (
            <Card key={item.id} movie={item} image_url={image_url} />
          ))
        ) : (
          <p>No movies found. Try searching for something else.</p>
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
    </div>
  );
};

export default Home;
