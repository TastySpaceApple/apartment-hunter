import React from 'react';
import './apartment-card.scss';
import ImagesViewer from "../images-viewer/images-viewer";

const ApartmentCard = ({ info }) => (
  <div className='apartment-card'>
    { info.price.toLocaleString() }<br/>
    <a href={info.link}>{info.link}</a>
    <ImagesViewer images={info.pictures} />
  </div>
);

export default ApartmentCard;
