import { useContext } from "react";
import FavoritesContext from "../../store/favorites-context";
import MeetupItem from "./MeetupItem";
import classes from './MeetupList.module.css';

function MeetupList(props) {
  const favoriteCtx = useContext(FavoritesContext);

  function removeLoadedMeetup(meetupId) {
    if(favoriteCtx.isFavorite(meetupId)) {
      favoriteCtx.removeFavorite(meetupId);
    }
    props.setMeetups(props.meetups.filter((meetup) => meetup.id !== meetupId));
  }

  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => <MeetupItem 
          key={meetup.id}
          id={meetup.id}
          title={meetup.title}
          image={meetup.image}
          address={meetup.address}
          description={meetup.description}
          removeLoadedMeetup={removeLoadedMeetup}
        />
      )}
    </ul>
  );
}

export default MeetupList;