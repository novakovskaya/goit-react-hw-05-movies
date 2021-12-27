import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./styles/Cast.module.css";
import { fetchInfoAboutCast } from "../services/movies";
import imgNotFound from "../images/notfound.png";

const MoviesCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchInfoAboutCast(movieId).then((movie) => setCast(movie.cast));
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {cast &&
        cast.map(({ id, profile_path, name, character }) => {
          return (
            <li key={id} className={styles.item}>
              {profile_path ? (
                <img
                  src={`https://themoviedb.org/t/p/w500${profile_path}`}
                  alt={name}
                  width={150}
                />
              ) : (
                <img
                  className={styles.images}
                  src={imgNotFound}
                  alt="not found"
                  width={150}
                />
              )}
              <p className={styles.name}>{name}</p>
              <p className={styles.text}>Character: {character}</p>
            </li>
          );
        })}
    </ul>
  );
};

MoviesCast.propTypes = {
  id: PropTypes.number,
  profile_path: PropTypes.string,
  name: PropTypes.string,
  character: PropTypes.string,
};

export default MoviesCast;
