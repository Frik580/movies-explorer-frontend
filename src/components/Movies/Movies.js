import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import NextMovies from "../NextMovies/NextMovies";
import Preloader from "../Preloader/Preloader";

function Movies({
  isPreloader,
  onFindMovies,
  moviesList,
  isFindMovies,
  messageError,
  isShortFilms,
  onShortFilms,
  queryMoviesText,
  onMovieLike,
  moviesSavedList,
}) {
  return (
    <div className="movies">
      <SearchForm
        onFindMovies={onFindMovies}
        isShortFilms={isShortFilms}
        onShortFilms={onShortFilms}
        queryMoviesText={queryMoviesText}
      />
      {isPreloader && <Preloader />}
      <MoviesCardList
        moviesList={moviesList}
        isFindMovies={isFindMovies}
        messageError={messageError}
        onMovieLike={onMovieLike}
        moviesSavedList={moviesSavedList}
      />
      <NextMovies />
    </div>
  );
}

export default Movies;
