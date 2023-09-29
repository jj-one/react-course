import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import MeetupList from "../components/meetups/MeetupList";


function FavoritesPage() {

  const favoriteCtx = useContext(FavoritesContext);
  const favoriteMeetups = favoriteCtx.favorites;

  return (
    <section>
      <h1>My Favorites</h1>

      {favoriteCtx.totalFavorites < 1 && <div>Sorry, you have not made any meetups your favorite.</div>}
      {favoriteCtx.totalFavorites > 0 && <MeetupList meetups={favoriteMeetups} />}
    </section>
  );
}

export default FavoritesPage;