import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import NextMovies from "../NextMovies/NextMovies";

function SavedMovies({
  isPreloader,
  moviesList,
  onMovieDelete,
  onFindMovies,
  isShortFilms,
  onShortFilms,
  isFindMovies,
  messageError,
  queryMoviesText,
}) {
  return (
    <div className="savedmovies">
      <SearchForm
        onFindMovies={onFindMovies}
        isShortFilms={isShortFilms}
        onShortFilms={onShortFilms}
        queryMoviesText={queryMoviesText}
      />
      {isPreloader && <Preloader />}
      <MoviesCardList
        saved={true}
        moviesList={moviesList}
        isFindMovies={isFindMovies}
        messageError={messageError}
        onMovieDelete={onMovieDelete}
      />
      <NextMovies />
    </div>
  );
}

export default SavedMovies;
