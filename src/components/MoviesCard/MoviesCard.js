import React from "react";
import "./MoviesCard.css";
import movie from "../../images/movie.png";

function MoviesCard({ saved }) {
  return (
    <li className="element">
      <div className="element__info">
        <div className="element__text">
          <h2 className="element__title">33 слова о дизайне</h2>
          <p className="element__time">1ч 47м</p>
        </div>
        {saved ? (
          <button className={"element__delete-button"} type="button" />
        ) : (
          <button className={`element__like-button`} type="button" />
        )}
      </div>
      <img src={movie} className="element__pic" alt="Фильм" />
    </li>
  );
}

export default MoviesCard;
