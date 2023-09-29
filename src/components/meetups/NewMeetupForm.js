import { useRef, useState } from 'react';
import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';
import usePost from '../../network/usePost';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function NewMeetupForm() {

  const history = useHistory();
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(null);
  usePost("meetups", formData, respHandler);

  const titleRef = useRef();
  const imageURLRef = useRef();
  const addressRef = useRef();
  const descriptionRef = useRef();

  function handleSubmit(e) {
    if (e){
      e.preventDefault();
    }
    const titleVal = titleRef.current.value;
    const imageURLVal = imageURLRef.current.value;
    const addressVal = addressRef.current.value;
    const descriptionVal = descriptionRef.current.value;

    const meetupData = {
      title: titleVal,
      image: imageURLVal,
      address: addressVal,
      description: descriptionVal
    };

    setIsLoading(true);
    setFetchErr(null);
    setFormData(meetupData);
    
  }

  function respHandler(res){
    setIsLoading(false);
    if(res === 201){
      history.replace("/");
    }
    else{
      setFetchErr(res);
    }
  }

  

  return (
    <Card>
      <form className={classes.form}  onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" id="title" required ref={titleRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image URL</label>
          <input type="url" id="image" required ref={imageURLRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Meetup Address</label>
          <input type="text" id="address" required ref={addressRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Meetup Image URL</label>
          <textarea id="description" required rows="5" ref={descriptionRef} >
          </textarea>
        </div>
        {fetchErr && <div className={classes.actions}>{fetchErr}</div>}
        {!isLoading && <div className={classes.actions}><button>Add Meetup</button></div>}
        {isLoading && <div className={classes.actions}><button disabled>Adding Meetup ...</button></div>}

      </form>
    </Card>
  );
}

export default NewMeetupForm;