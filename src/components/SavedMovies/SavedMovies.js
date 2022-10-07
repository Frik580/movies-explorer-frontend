import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import NextMovies from "../NextMovies/NextMovies";
import Preloader from "../Preloader/Preloader";

function SavedMovies() {
  return (
    <div className="savedmovies">
      <SearchForm />
      <Preloader />
      <MoviesCardList saved={true} />
      <NextMovies />
    </div>
  );
}

export default SavedMovies;
