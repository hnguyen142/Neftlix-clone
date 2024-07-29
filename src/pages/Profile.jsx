import React, { useEffect, useState, useContext } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import AuthContext from '../context/AuthContext'; // Correctly import AuthContext as a named export
import { onSnapshot, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../services/firebase';
import { createImageUrl } from '../services/movieService'; // Assuming createImageUrl is correctly imported

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.email), (doc) => {
        if (doc.exists()) {
          setMovies(doc.data().favShows || []);
        }
      });

      return () => unsubscribe();
    }
  }, [user?.email]);

  const removeMovie = async (movie) => {
    if (user?.email) {
      try {
        await updateDoc(doc(db, 'users', user.email), {
          favShows: arrayRemove(movie),
        });
        setMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
      } catch (error) {
        console.error('Error removing movie:', error);
      }
    }
  };

  const slide = (offset) => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft += offset;
    }
  };

  if (!user) {
    return <p>Loading shows...</p>;
  }

  return (
    <div>
      {/* Background and user info */}
      <div className="relative">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0552717c-9d8c-47bd-9640-4f4efa2de663/52e4cd00-9a33-4f8b-afa0-6623070f7654/US-en-20240701-POP_SIGNUP_TWO_WEEKS-perspective_WEB_6392408d-671b-40c8-83c8-888c04ea535d_large.jpg"
          alt="Background"
          className="w-full h-[500px] object-cover"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl font-bold text-white">My Shows</h1>
          <p className="text-gray-400 text-lg">{user.email}</p>
        </div>
      </div>

      {/* Horizontal scrolling movies */}
      <div className="p-4">
        <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth" id="slider">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div key={index} className="relative inline-block p-2">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-48 h-72 object-cover rounded"
                />
                <AiOutlineClose
                  className="absolute top-2 right-2 text-white cursor-pointer"
                  onClick={() => removeMovie(movie)}
                />
              </div>
            ))
          ) : (
            <p className="text-white">No favorite shows added yet.</p>
          )}
        </div>
        <MdChevronLeft
          className="absolute left-0 top-[50%] bg-white rounded-full p-1 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
          onClick={() => slide(-500)}
          size={40}
        />
        <MdChevronRight
          className="absolute right-0 top-[50%] bg-white rounded-full p-1 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
          onClick={() => slide(500)}
          size={40}
        />
      </div>

      {/* Favorite Shows */}
      <h2 className="font-bold md:text-xl p-4 capitalize">Favorite Shows</h2>
      <div className="relative group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          id="slider" // Corrected ID for unique identifier
          className="w-full h-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="relative inline-block w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px]">
                <img
                  src={createImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 ease-in-out">
                  <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold text-white">
                    {movie.title}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-white">No favorite shows added yet.</p>
          )}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </div>
  );
};

export default Profile;
