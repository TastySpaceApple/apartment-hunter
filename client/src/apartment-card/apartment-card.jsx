import React from 'react';
import './apartment-card.scss';
import ImagesViewer from "../images-viewer/images-viewer";

const ApartmentCard = ({ info, handleSave, handleRemove }) => (
  <div className="apartment-card">
    <ul class="short_details">
      <li><small>מחיר</small><br/>{ info.price.toLocaleString() }</li>
      <li><small>מ"ר</small><br/>{ info.square_meters }</li>
      <li><small>קומה</small><br/>{ info.floor }</li>
      <li><small>שכונה</small><br/>{ info.neighborhood }</li>
    </ul>
    <iframe width="100%" height="350" frameborder="0" scrolling="no"
            marginheight="0" marginwidth="0"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=34.719062807271264,32.03099935252474,34.87973785609939,32.12801497061816&layer=transportmap&marker=${info.coordinates.latitude},${info.coordinates.longitude}`}>
    </iframe>
    <br/>
    <a href={info.link}>{info.link}</a>
    <ImagesViewer images={info.pictures} />
    <div className="actions">
      <button className="actions__save" onClick={handleSave}>Save</button>
      <button className="actions__remove" onClick={handleRemove}>Remove</button>
    </div>
  </div>
);

export default ApartmentCard;
