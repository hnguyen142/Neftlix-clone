import React, { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints, { createImageUrl } from '../services/movieService';

const Hero = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios.get(endpoints.popular)
      .then((response) => {
        const movies = response.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      })
      .catch((error) => {
        console.error('Error fetching popular movies:', error);
      });
  }, []);

  if (!movie || !movie.title) {
    return (
      <>
        <p>Fetching movie...</p>
      </>
    );
  }

  const { title, backdrop_path, release_date, overview } = movie;
  const imageUrl = createImageUrl(backdrop_path, 'original');

  return (
    <div className="w-full h-[350px] lg:h-[500px] bg-gradient-to-r from-black relative overflow-hidden">
      <div className="relative w-full h-full flex justify-center items-center">
        {backdrop_path ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full md:w-[70%] lg:w-[60%] h-auto object-cover object-center"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'fallback-image-url'; // Optional: Replace with a fallback image URL
            }}
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center text-white">
            <p>No Image Available</p>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white bg-black bg-opacity-50 w-full">
        <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
        <div className="mt-4 mb-2">
          <button className="capitalize border bg-gray-300 text-black py-2 px-4 ml-2">Play</button>
          <button className="capitalize border border-gray-300 py-2 px-4 ml-2">Watch Later</button>
        </div>
        <p className="w-full md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] text-gray-200 text-sm md:text-base leading-snug md:leading-normal">
          {overview}
        </p>
        <p className="text-sm md:text-base mt-2">Release Date: {release_date}</p>
      </div>
    </div>
  );
};

export default Hero;
