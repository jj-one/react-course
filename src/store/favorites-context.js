import { createContext, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  isFavorite: (meetupId) => {}
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteMeetup){
    setUserFavorites((prevFavoriteMeetup) => {
      return prevFavoriteMeetup.concat(favoriteMeetup);
    });
  }

  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevFavoriteMeetup) => {
      return prevFavoriteMeetup.filter(meetup => meetupId !== meetup.id);
    });
  }

  function isFavoriteMeetup(meetupId) {
    return userFavorites.some(userFavorite => userFavorite.id === meetupId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    isFavorite: isFavoriteMeetup
  };

  return (
    <FavoritesContext.Provider value={context} >
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;