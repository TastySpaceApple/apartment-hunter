import React, {Component, Fragment, useEffect, useState} from 'react';
import styles from './styles/main.scss';
import ApartmentCard from "./apartment-card/apartment-card";

const isDev = process.env.NODE_ENV == 'development';
const hostname = isDev ? 'http://localhost:3000' : '';

function SingleCardView(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});

  const loadNext = () => {
    setIsLoaded(false);
    fetch(`${hostname}/api/find${window.location.search}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setItem(result);
          setIsLoaded(true);
        },
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
  } else if (!item){
    return <div>Not Found :/</div>;
  } else {
    return (
      <main>
        <ApartmentCard info={item}
          handleRemove={() => {} }
          handleSave={() => {} }
        />
      </main>
    );
  }
}

export default SingleCardView;
