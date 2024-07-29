



// Define the TMDB API key and base URL
const key = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3";

// Define the API endpoints with the correct keys
const endpoints = {
  popular: `${baseUrl}/movie/popular?api_key=${key}`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,
  trending: `${baseUrl}/trending/movie/day?api_key=${key}&language=en-US&page=2`,
  comedy: `${baseUrl}/search/movie?api_key=${key}&language=en-US&query=comedy&page=2&include_adult=false`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}`,
};

// Function to create image URL
export function createImageUrl(filename, size = 'original') {
  if (!filename) return ''; // Handle case where filename is undefined or null
  return `https://image.tmdb.org/t/p/${size}${filename}`;
}

export default endpoints;
