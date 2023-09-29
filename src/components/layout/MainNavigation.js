import { Link } from "react-router-dom/cjs/react-router-dom";
import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const favoriteCtx = useContext(FavoritesContext);
  const totalFavorites = favoriteCtx.totalFavorites;

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>

      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="/new-meetup">Create New Meetup</Link>
          </li>
          <li>
            <Link to="/favorites">My Favorites 
              <span className={classes.badge}>({totalFavorites})</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;