import React from 'react';
import styles from './images-viewer.scss'

const ImagesViewer = ({ images }) => (
  <ul className={ styles['images-viewer'] }>
    {images.map((image, i) => (
      <li key={i}>
        <img src={image} />
      </li>
    ))}
  </ul>
);

export default ImagesViewer;
