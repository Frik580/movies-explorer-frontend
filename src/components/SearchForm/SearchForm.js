import "./SearchForm.css";
import React, { useEffect } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function SearchForm({
  onFindMovies,
  isShortFilms,
  onShortFilms,
  queryMoviesText,
  isErrors,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    queryMoviesText
      ? setValues({ name: queryMoviesText })
      : setValues({ name: "" });
  }, [queryMoviesText]);

  useEffect(() => {
    errors.name ? isErrors(true) : isErrors(false)
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFindMovies({
      name: values.name,
    });
    // resetForm();
  };

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit} noValidate>
        <fieldset className="searchform__form-conteiner">
          <input
            type="text"
            value={values.name ?? ""}
            onChange={handleChange}
            name="name"
            className="searchform__form-item"
            minLength="1"
            maxLength="30"
            placeholder="Фильм"
            required
          />
          <button
            disabled={!isValid}
            className={`searchform__form-button ${
            !isValid && "searchform__form-button_disabled"
          }`}
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
