import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Box from "../Box/Box";

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
  onCloseNext,
  onOpenNext,
  isErrors,
}) {
  return (
    <div className="savedmovies">
      <SearchForm
        onFindMovies={onFindMovies}
        isShortFilms={isShortFilms}
        onShortFilms={onShortFilms}
        queryMoviesText={queryMoviesText}
        isErrors={isErrors}
      />
      {isPreloader && <Preloader />}
      <MoviesCardList
        saved={true}
        moviesList={moviesList}
        isFindMovies={isFindMovies}
        messageError={messageError}
        onMovieDelete={onMovieDelete}
        onCloseNext={onCloseNext}
        onOpenNext={onOpenNext}
      />
      <Box />
    </div>
  );
}

export default SavedMovies;
