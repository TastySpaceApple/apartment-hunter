import React, {Component, Fragment, useEffect, useState} from 'react';
import styles from './styles/main.scss';
import ApartmentCard from "./apartment-card/apartment-card";

const content = 'Hello world!';

function SwipeView(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  /*useEffect(() => {
    fetch("http://localhost:3000/api/get-all")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])*/

  const loadNext = lastChoice => {
    fetch("http://localhost:3000/api/save-choice-and-get-next", {
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
