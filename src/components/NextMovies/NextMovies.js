import "./NextMovies.css";
import React from "react";

function NextMovies({ onNextMovies, isButtonNext }) {
  return (
    <section className="nextmovies">
      {isButtonNext && (
        <button
          onClick={onNextMovies}
          className={"nextmovies__button hover-button"}
          type="button"
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default NextMovies;
