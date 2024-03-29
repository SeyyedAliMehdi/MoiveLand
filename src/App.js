import { useState, useEffect, useCallback } from "react";
import MovieCard from "./MovieCard"
import SearchIcon from "./search.svg"
import './App.css';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=88de94c3'

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = useCallback(async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      searchMovies(searchTerm);
    } else {
      setMovies([]);
    }
  }, [searchMovies, searchTerm]);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for Movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  )
}

export default App;
