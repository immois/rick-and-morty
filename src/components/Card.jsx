import React from "react";

import "./styles/Card.css";

const Card = ({
  name,
  image,
  created,
  status,
  species,
  gender,
  origin,
  location,
}) => {
  return (
    <article className="Card">
      <div className="Card__header">
        <img src={image} alt="avatar del personaje" />
        <div>
          <h2>{name}</h2>
          <p>Create {created}</p>
        </div>
      </div>
      <ul className="Card__footer">
        <li>
          <span>Status</span>
          <span>{status}</span>
        </li>
        <li>
          <span>Species</span>
          <span>{species}</span>
        </li>
        <li>
          <span>Gender</span>
          <span>{gender}</span>
        </li>
        <li>
          <span>origin</span>
          <span>{origin.name}</span>
        </li>
        <li>
          <span>location</span>
          <span>{location.name}</span>
        </li>
      </ul>
    </article>
  );
};

export default Card;
