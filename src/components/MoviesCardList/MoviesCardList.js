import "./MoviesCardList.css";
import React, { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { WINDOW_SIZE, MOVIES_QUANTITY } from "../../utils/Constants";

function MoviesCardList({
  saved,
  moviesList,
  isFindMovies,
  messageError,
  onMovieLike,
  onMovieDelete,
  moviesSavedList,
  count,
  onCloseNext,
  onOpenNext,
}) {
  const [width, setWidth] = useState(window.innerWidth);
  const [renderMovies, setRenderMovies] = useState([]);
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    const handleResizeWindow = () =>
      setTimeout(setWidth(window.innerWidth), 10000);

    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    if (width >= WINDOW_SIZE.HIGH) {
      setQuantity(MOVIES_QUANTITY.HIGH + count * 3);
    } else if (width >= WINDOW_SIZE.MIDDLE) {
      setQuantity(MOVIES_QUANTITY.MIDDLE + count * 2);
    } else if (width < WINDOW_SIZE.MIDDLE) {
      setQuantity(MOVIES_QUANTITY.SMALL + count * 2);
    }

    const movies = moviesList.filter(function (item, index) {
      return index < quantity;
    });
    setRenderMovies(movies);
    quantity >= moviesList.length ? onCloseNext() : onOpenNext();
  }, [count, moviesList, quantity, width]);

  return (
    <section className="elements">
      {isFindMovies && !moviesList.length && (
        <p className="elements__message">Ничего не найдено</p>
      )}
      {messageError && <p className="elements__message">{messageError}</p>}
      <ul className="elements__list">
        {saved
          ? moviesList.map((movie) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                onMovieLike={onMovieLike}
                onMovieDelete={onMovieDelete}
                saved={saved}
              />
            ))
          : renderMovies.map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                onMovieLike={onMovieLike}
                saved={saved}
                moviesSavedList={moviesSavedList}
              />
            ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
