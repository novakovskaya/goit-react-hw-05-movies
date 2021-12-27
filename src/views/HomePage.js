import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./styles/Page.module.css";
import { fetchTrendingMovies } from "../services/movies";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then((movie) => setMovies(movie.results));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trending today</h2>

      {movies && (
        <ul className={styles.list}>
          {movies.map(({ id, poster_path, title }) => (
            <li key={id} className={styles.item}>
              <Link to={`/movies/${id}`} className={styles.link}>
                <img
                  src={`https://themoviedb.org/t/p/w500${poster_path}`}
                  alt={title}
                  width={240}
                />
                <h2 className={styles.titlePoster}>{title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
