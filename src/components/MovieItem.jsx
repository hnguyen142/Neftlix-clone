import React, { useState } from 'react';
import { createImageUrl } from '../services/movieService';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Correct the hook import
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const MovieItem = ({ movie }) => {
  const [like, setLike] = useState(false);
  const { user } = useAuth(); // Correct hook usage
  const { title, backdrop_path, poster_path } = movie;

  const markFavShow = async () => {
    if (user) {
      const userDoc = doc(db, 'users', user.email);
      setLike(!like);
      try {
        await updateDoc(userDoc, {
          favShows: arrayUnion({ // Ensure consistent key name
            ...movie
          }),
        });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      alert("Login to save a movie");
    }
  };

  // Use either backdrop_path or poster_path, with a fallback to prevent broken images
  const imageUrl = backdrop_path
    ? createImageUrl(backdrop_path, 'w500')
    : poster_path
      ? createImageUrl(poster_path, 'w500')
      : 'fallback-image-url'; // Replace with an actual fallback URL

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 ease-in-out">
        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
          {title}
        </p>
        <p onClick={markFavShow} className="cursor-pointer absolute top-2 left-2">
          {like ? (
            <FaHeart size={20} className="text-red-600" />
          ) : (
            <FaRegHeart size={20} className="text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieItem;
