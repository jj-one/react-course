import { useContext, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import FavoritesContext from '../../store/favorites-context';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import useDelete from '../../network/useDelete';

function MeetupItem(props) {
  const favoriteCtx = useContext(FavoritesContext);
  const isFavorite = favoriteCtx.isFavorite(props.id);
  // const history = useHistory();
  const [url, setUrl] = useState("");
  let isLoading = false;

  useDelete(url, respHandler);

  function toggleFavorite(e) {
    if(isFavorite){
      favoriteCtx.removeFavorite(props.id);
    }
    else{
      favoriteCtx.addFavorite({
        id: props.id,
        title: props.title,
        image: props.image,
        address: props.address,
        description: props.description
      });
    }
  }

  function deleteHandler() {
    isLoading = true;
    setUrl(`meetups/${props.id}`);
  }

  function respHandler(status) {
    isLoading = false;
    if(status === 200) {
      console.log("DELETE SUCCESS");
      props.removeLoadedMeetup(props.id);
      // setUrl(``);
      // history.push("/");
      console.log("DELETE SUCCESS 1");
    }
    else{
      alert(status);
      // setUrl(``);
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavorite}>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</button>
        </div>
        {!isLoading && <div className={classes.actions}><button onClick={deleteHandler}>Delete Meetup</button></div>}
        {isLoading && <div className={classes.actions}><button disabled>Deleting Meetup ...</button></div>}
      </Card>
    </li>
  );
}

export default MeetupItem;