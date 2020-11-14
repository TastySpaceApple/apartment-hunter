import React, {Component, Fragment, useEffect, useState} from 'react';
import styles from './styles/main.scss';
import ApartmentCard from "./apartment-card/apartment-card";

const content = 'Hello world!';

function App(){
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main>
          {items.filter(item => item.pictures.length > 0).map(item => (
            <ApartmentCard key={item.postId} info={item} />
          ))}
      </main>
    );
  }
}

export default App;
