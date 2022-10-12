import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import NextMovies from "../NextMovies/NextMovies";
import Preloader from "../Preloader/Preloader";

function Movies() {
  return (
    <div className="movies">
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <NextMovies />
    </div>
  );
}

export default Movies;
