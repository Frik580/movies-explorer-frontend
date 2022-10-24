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
  onNextMovies,
  count,
  onCloseNext,
  onOpenNext,
  isButtonNext,
  isErrors,
}) {
  return (
    <div className="movies">
      <SearchForm
        onFindMovies={onFindMovies}
        isShortFilms={isShortFilms}
        onShortFilms={onShortFilms}
        queryMoviesText={queryMoviesText}
        isErrors={isErrors}
      />
      {isPreloader && <Preloader />}
      <MoviesCardList
        moviesList={moviesList}
        isFindMovies={isFindMovies}
        messageError={messageError}
        onMovieLike={onMovieLike}
        moviesSavedList={moviesSavedList}
        count={count}
        onCloseNext={onCloseNext}
        onOpenNext={onOpenNext}
      />
      <NextMovies onNextMovies={onNextMovies} isButtonNext={isButtonNext} />
    </div>
  );
}

export default Movies;
