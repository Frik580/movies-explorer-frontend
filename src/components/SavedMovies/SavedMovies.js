import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Box from "../Box/Box";

function SavedMovies() {
  return (
    <div className="savedmovies">
      <SearchForm />
      <Preloader />
      <MoviesCardList saved={true} />
      <Box />
    </div>
  );
}

export default SavedMovies;
