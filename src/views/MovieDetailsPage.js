import { useState, useEffect, lazy } from "react";
import {
  useParams,
  NavLink,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { BsChevronDoubleLeft } from "react-icons/bs";

import styles from "./styles/MoviesPage.module.css";
import { fetchFullInfoMovies } from "../services/movies";
import MovieCard from "../components/MovieCard";

const Cast = lazy(() => import("./Cast"));
const Reviews = lazy(() => import("./Reviews"));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchFullInfoMovies(movieId).then(setMovie);
  }, [movieId]);

  const onClickGoBack = () => {
    history.push(location?.state?.from?.location || "/");
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} type="button" onClick={onClickGoBack}>
        <BsChevronDoubleLeft style={{ width: 20, height: 20 }} />
        Go back
      </button>

      {movie && <MovieCard movie={movie} />}
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Additional information</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to={{ pathname: `${url}/cast`, state: { ...location.state } }}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Cast
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink
              to={{ pathname: `${url}/reviews`, state: { ...location.state } }}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Switch>
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Switch>
    </div>
  );
};

export default MovieDetailsPage;
