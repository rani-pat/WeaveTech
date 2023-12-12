import React from "react";
import "./card.scss";

const Card = ({ text, imageSrc, subtext }) => {
  return (
    <div className="card">
      <div className="card-text">
        <p className="card-text-p1">{text}</p>
        <p className="card-text-p2">{subtext}</p>
      </div>
      <div className="card-img">
        <img src={imageSrc} alt="Card" />
      </div>
    </div>
  );
};

export default Card;
