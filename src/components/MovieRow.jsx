import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const MovieRow = ({ title, url, rowId }) => { // Use the rowId passed as a prop
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [url]);

  // Function to slide the slider by a certain offset
  const slide = (offset) => {
    const slider = document.getElementById(`slider-${rowId}`);
    if (slider) {
      slider.scrollLeft += offset;
    }
  };

  return (
    <>
      <h2 className="font-bold md:text-xl p-4 capitalize">{title}</h2>
      <div className="relative group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          id={`slider-${rowId}`} // Use the rowId prop for unique ID
          className="w-full h-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} /> // Ensure `movie.id` is unique
            ))
          ) : (
            <p className="p-4">No movies found</p>
          )}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </>
  );
};

export default MovieRow;
