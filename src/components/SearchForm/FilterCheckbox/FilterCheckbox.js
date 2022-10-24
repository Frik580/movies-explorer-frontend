import "./FilterCheckbox.css";

function FilterCheckbox({ isShortFilms, onShortFilms }) {
  return (
    <div className="checkbox">
      <p className="checkbox__text">Короткометражки</p>
      <button
        onClick={onShortFilms}
        className={isShortFilms ? "checkbox__tumb_active" : "checkbox__tumb"}
        type="button"
      />
    </div>
  );
}

export default FilterCheckbox;
