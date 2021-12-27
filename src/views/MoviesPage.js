import { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./styles/Page.module.css";
import { fetchSearchMovies } from "../services/movies";
import SearchForm from "../components/SearchForm";

const MoviesPage = () => {
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

    fetchSearchMovies(searchQuery).then((movie) => {
      if (movie.length === 0) {
        toast.error("Nothing not found!");
      }

      setMovies(movie.results);
    });
  }, [searchQuery]);

  const handleFormSubmit = (searchQuery) => {
    setMovies([]);
    setSearchQuery(searchQuery);

    history.push({ ...location, search: `query=${searchQuery}` });
  };

  return (
    <div className={styles.container}>
      <SearchForm onSubmit={handleFormSubmit} />

      <ul className={styles.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.item}>
            <Link to={`${url}/${movie.id}`} className={styles.link}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>

      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default MoviesPage;
