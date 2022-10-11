import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies() {
  return (
    <div className="savedmovies">
      <SearchForm />
      <Preloader />
      <MoviesCardList saved={true} />
    </div>
  );
}

export default SavedMovies;
