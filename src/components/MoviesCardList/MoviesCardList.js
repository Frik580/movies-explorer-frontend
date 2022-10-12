import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ saved }) {
  return (
    <section className="elements">
      <ul className="elements__list">
        <MoviesCard saved={saved} />
        <MoviesCard saved={saved} />
        <MoviesCard saved={saved} />
        <MoviesCard saved={saved} />
        <MoviesCard saved={saved} />
      </ul>
    </section>
  );
}

export default MoviesCardList;
