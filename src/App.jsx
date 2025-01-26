// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';;
import Navbar from './Project-10 (Movie)/Components/Navbar/Navbar';
import Footer from './Project-10 (Movie)/Components/Footer/Footer';
import CastDetails from './Project-10 (Movie)/Pages/Cast/CastDetails'; // Import the CastDetails component
import MoviePage from './Project-10 (Movie)/Pages/MoviePage/MoviePage'; // Import the MoviePage component 
import Home from './Project-10 (Movie)/Pages/Home/Home';  // Import the Home component
import { DarkModeProvider } from '../src/context/DarkModeContext'; // Import the DarkModeProvider

const AboutPage = () => {
  return <h1>About Us</h1>;
};

const ContactPage = () => {
  return <h1>Contact Us</h1>;
};

const App = () => {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Use the Home component */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/cast/:castId" element={<CastDetails />} />
          </Routes>   
        </div>
        <Footer />
      </BrowserRouter>
    </DarkModeProvider>
  );
};

export default App;
