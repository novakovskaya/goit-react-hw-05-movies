import { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./styles/Page.module.css";
import { fetchSearchMovies } from "../services/movies";
import SearchForm from "../components/SearchForm";
import imgNotFound from "../images/notfound-movies.jpeg";

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
        {movies.map(({ id, poster_path, title }) => (
          <li key={id} className={styles.item}>
            <Link to={`${url}/${id}`} className={styles.link}>
              {poster_path ? (
                <img
                  src={`https://themoviedb.org/t/p/w500${poster_path}`}
                  alt={title}
                  width={240}
                />
              ) : (
                <img src={imgNotFound} alt="not found" width={240} />
              )}
              <h2 className={styles.titlePoster}>{title}</h2>
            </Link>
          </li>
        ))}
      </ul>

      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default MoviesPage;
