import React, {Component, Fragment, useEffect, useState} from 'react';
import styles from './styles/main.scss';
import ApartmentCard from "./apartment-card/apartment-card";

const content = 'Hello world!';

function SavedListView(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const loadSaved = lastChoice => {
    fetch("http://localhost:3000/api/get-saved")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setItems(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => loadSaved(), [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main>
        <ul>
        {
          items.map((item) =>
            <li key={item.postId}>
              <ApartmentCard info={item.post}
                handleRemove={() => {}}
                handleSave={() => {}}
              />
            </li>
          )
        }
        </ul>
      </main>
    );
  }
}

export default SavedListView;
