import "./MoviesCardList.css";
import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  saved,
  moviesList,
  isFindMovies,
  messageError,
  onMovieLike,
  onMovieDelete,
  moviesSavedList,
}) {
  return (
    <section className="elements">
      {isFindMovies && !moviesList.length && (
        <p className="elements__message">Ничего не найдено</p>
      )}
      {messageError && <p className="elements__message">{messageError}</p>}
      <ul className="elements__list">
        {moviesList.map((movie) =>
          saved ? (
            <MoviesCard
              key={movie._id}
              movie={movie}
              onMovieLike={onMovieLike}
              onMovieDelete={onMovieDelete}
              saved={saved}
            />
          ) : (
            <MoviesCard
              key={movie.id}
              movie={movie}
              onMovieLike={onMovieLike}
              // onMovieDelete={onMovieDelete}
              saved={saved}
              moviesSavedList={moviesSavedList}
            />
          )
        )}
      </ul>
    </section>
  );
}

export default MoviesCardList;
