import React, {Component, Fragment, useEffect, useState} from 'react';
import styles from './styles/main.scss';
import ApartmentCard from "./apartment-card/apartment-card";

const isDev = process.env.NODE_ENV == 'development';
const hostname = isDev ? 'http://localhost:3000' : '';

function SwipeView(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});

  const loadNext = lastChoice => {
    setIsLoaded(false);
    fetch(`${hostname}/api/save-choice-and-get-next`, {
          method: 'POST',
          body: JSON.stringify({postId : item.postId, choice: lastChoice}),
          headers: {
            "Content-Type": "application/json"
          }
        })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setItem(result);
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => loadNext(), [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main>
        <ApartmentCard info={item}
          handleRemove={() => loadNext('removed')}
          handleSave={() => loadNext('saved')}
        />
      </main>
    );
  }
}

export default SwipeView;
