import PropTypes from "prop-types";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const { poster_path, title, vote_average, overview, genres, release_date } =
    movie;
  const date = release_date.substring(0, 4);

  return (
    <div className={styles.container}>
      <img
        src={`https://themoviedb.org/t/p/w500${poster_path}`}
        alt={title}
        width={360}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          {title} {date}
        </h2>
        <p className={styles.score}>User score: {vote_average}</p>
        <h3 className={styles.titleDesc}>Overview</h3>
        <p className={styles.text}>{overview}</p>
        <h3 className={styles.titleDesc}>Genres</h3>
        <ul className={styles.list}>
          {genres.map((genre) => (
            <li className={styles.item} key={genre.id}>
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number,
  poster_path: PropTypes.string,
  title: PropTypes.string,
  vote_average: PropTypes.number,
  overview: PropTypes.string,
  genres: PropTypes.array,
};

export default MovieCard;
