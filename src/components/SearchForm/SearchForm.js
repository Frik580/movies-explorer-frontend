import "./SearchForm.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="searchform">
      <form className="searchform__form" noValidate>
        <fieldset className="searchform__form-conteiner">
          <input
            type="text"
            name="name"
            className="searchform__form-item"
            minLength="2"
            maxLength="30"
            placeholder="Фильм"
            required
          />
          {/* <span id="user-name-error" className="error">
    
          </span> */}
          <button className={`searchform__form-button`} type="submit" name="button" />
        </fieldset>
        <FilterCheckbox />
      </form>
      <p className="searchform__border"></p>
    </section>
  );
}

export default SearchForm;
