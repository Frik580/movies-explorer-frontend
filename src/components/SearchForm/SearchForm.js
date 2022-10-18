import "./SearchForm.css";
import React, { useEffect, useState } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function SearchForm({ onFindMovies, isShortFilms, onShortFilms, queryMoviesText }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    queryMoviesText ? setPlaceholder(queryMoviesText) : setPlaceholder("Фильм");
  }, [queryMoviesText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFindMovies({
      name: values.name,
    });
    resetForm();
  };

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit}>
        <fieldset className="searchform__form-conteiner">
          <input
            type="text"
            value={values.name ?? ""}
            onChange={handleChange}
            name="name"
            className="searchform__form-item"
            minLength="1"
            maxLength="30"
            placeholder={placeholder}
            required
          />
          <button
            className={`searchform__form-button hover-button`}
            type="submit"
            name="button"
          />
        </fieldset>
        <FilterCheckbox
          isShortFilms={isShortFilms}
          onShortFilms={onShortFilms}
        />
      </form>
      <p className="searchform__border"></p>
    </section>
  );
}

export default SearchForm;
