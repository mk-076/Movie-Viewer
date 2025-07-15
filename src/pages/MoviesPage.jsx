import { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import { preFetchMovies } from "../data/preFetchMovies";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const preFetchedMoviesData = useRef(null);

  function fetchFromAPI(parameter, searchTerm, page) {
    const apiKey = ""; // Get your own apiKey at OMDB ;
    const params = new URLSearchParams({
      apikey: apiKey,
      [parameter]: searchTerm,
      page: page,
    });

    return fetch(`https://www.omdbapi.com/?${params.toString()}`);
  }

  useEffect(() => {
    // Sets the movies array to a hard coded collection of movies
    async function fetchMovies() {
      try {
        setLoading(true);
        // Maps content of preFetchMovies to actual movie data
        const fetchPromises = preFetchMovies.map(async (movieTitle) => {
          const response = await fetchFromAPI("t", movieTitle);
          const data = await response.json();

          return data;
        });
        const fetchedMovies = await Promise.all(fetchPromises);
        setMovies(fetchedMovies);
        preFetchedMoviesData.current = fetchedMovies;
      } catch (error) {
        console.log("Error fetching movie: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  async function searchMovies(page = 1) {
    const trimmed = searchTerm.trim();
    if (!trimmed) return setMovies(preFetchedMoviesData.current);

    var param = null;

    param = searchTerm.length < 3 ? "t" : "s";
    const response = await fetchFromAPI(param, searchTerm, page);
    const data = await response.json();

    if (data.Response == "True") {
      if (param == "t") {
        setMovies([data]);
      } else if (page == 1) {
        setMovies(data.Search);
      } else if (page > 1) {
        setMovies((prev) => [...prev, ...data.Search]);
      }
      setPageCount(page);
    } else {
      return;
    }
  }

  if (loading)
    return (
      <p className="h-screen flex justify-center items-center text-2xl">
        loading movies...
      </p>
    );

  return (
    <div>
      <div className="flex font-bold justify-start mt-10 mx-30">
        <h1 className="text-2xl text-center">Movie Viewer🍿</h1>
      </div>
      <div className="flex justify-center mt-10">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchMovies={searchMovies}
        ></SearchBar>
      </div>
      <div className="py-20 px-30 gap-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie}></MovieCard>
        ))}
        {searchTerm.length >= 3 && (
          <div className="flex justify-center col-span-full my-8">
            <button
              className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 hover:scale-105 transition-all rounded"
              onClick={() => searchMovies(pageCount + 1)}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchBar({ searchTerm, setSearchTerm, searchMovies }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchMovies();
      }}
    >
      <input
        className="bg-gray-300 rounded-[2px] text-center text-xl transition-all focus:bg-gray-400 focus:outline-none focus:ring"
        type="text"
        placeholder="Enter movie title..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      ></input>
    </form>
  );
}

export default MoviesPage;
