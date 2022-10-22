import "./Profile.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Profile({ onLogout, onUpdateUser, messageError }) {
  const [isValidValue, SetIsValidValue] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const inputRef = useRef();
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
    inputRef.current.focus();
  }, [currentUser, messageError]);

  useEffect(() => {
    values.name === currentUser.name && values.email === currentUser.email
      ? SetIsValidValue(false)
      : SetIsValidValue(true);
  }, [currentUser.email, currentUser.name, values.email, values.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
    resetForm();
  };

  return (
    <div className="profile">
      <form onSubmit={handleSubmit} className="profile__form" noValidate>
        <h3 className="profile__form-title">{`Привет, ${currentUser.name}!`}</h3>
        <fieldset className="profile__form-conteiner">
          <label htmlFor="name" className="profile__form-label">
            Имя
          </label>
          <input
            type="text"
            ref={inputRef}
            value={values.name ?? ""}
            onChange={handleChange}
            name="name"
            className="profile__form-item"
            minLength="2"
            maxLength="30"
            placeholder={currentUser.name}
            required
          />
        </fieldset>
        <span id="about-error" className="profile__form-error">
          {errors.name && <p>{errors.name ?? "Error!!!"}</p>}
        </span>
        <fieldset className="profile__form-conteiner">
          <label htmlFor="email" className="profile__form-label">
            E-mail
          </label>
          <input
            type="email"
            value={values.email ?? ""}
            onChange={handleChange}
            name="email"
            className="profile__form-item"
            minLength="2"
            maxLength="30"
            placeholder={currentUser.email}
            required
          />
        </fieldset>
        <span id="about-error" className="profile__form-error">
          {errors.email && <p>{errors.email ?? "Error!!!"}</p>}
        </span>
        <span id="error" className="profile__form-error">
          {messageError}
        </span>

        <button
          disabled={!isValid || !isValidValue}
          className={`profile__form-button ${
            (!isValid || !isValidValue) && "profile__form-button_disabled"
          }`}
          type="submit"
          name="button"
        >
          Редактировать
        </button>
        <p onClick={onLogout} className="profile__link hover">
          Выйти из аккаунта
        </p>
      </form>
    </div>
  );
}

export default Profile;
