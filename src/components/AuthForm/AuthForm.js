import React, { useState, useRef, useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { Link } from "react-router-dom";
import "./AuthForm.css";

function AuthForm({ messageError, onRegister, onLogin, authForm }) {
  const inputRefRegister = useRef();
  const inputRefLogin = useRef();
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    setValues({ name: "", email: "", password: "" });
    authForm === "register" && inputRefRegister.current.focus();
    authForm === "login" && inputRefLogin.current.focus();
  }, [authForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    authForm === "register" &&
      onRegister({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    authForm === "login" &&
      onLogin({ email: values.email, password: values.password });
    resetForm();
  };

  return (
    <div className="authform">
      <Link to="/" className="authform__logo hover-button" />
      <form onSubmit={handleSubmit} className="authform__form" noValidate>
        <h3 className="authform__form-title">
          {authForm === "register" && "Добро пожаловать!"}
          {authForm === "login" && "Рады видеть!"}
        </h3>
        {authForm === "register" && (
          <fieldset className="authform__form-conteiner">
            <label htmlFor="name" className="authform__form-label">
              Имя
            </label>
            <input
              type="text"
              ref={inputRefRegister}
              value={values.name ?? ""}
              onChange={handleChange}
              name="name"
              className="authform__form-item"
              minLength="2"
              maxLength="30"
              placeholder="Имя"
              required
            />
            <span id="authform-error" className="authform__error">
              {errors.name && <p>{errors.name ?? "Error!!!"}</p>}
            </span>
          </fieldset>
        )}

        <fieldset className="authform__form-conteiner">
          <label htmlFor="email" className="authform__form-label">
            E-mail
          </label>
          <input
            type="email"
            ref={inputRefLogin}
            value={values.email ?? ""}
            onChange={handleChange}
            name="email"
            className="authform__form-item"
            placeholder="Email"
            required
          />
          <span id="authform-error" className="authform__error">
            {errors.email && <p>{errors.email ?? "Error!!!"}</p>}
          </span>
        </fieldset>

        <fieldset className="authform__form-conteiner">
          <label htmlFor="password" className="authform__form-label">
            Пароль
          </label>
          <input
            type="password"
            value={values.password ?? ""}
            onChange={handleChange}
            name="password"
            className="authform__form-item authform__form-item_color_pink"
            placeholder="Пароль"
            required
          />
          <span id="authform-error" className="authform__error">
            {errors.password && <p>{errors.password ?? "Error!!!"}</p>}
          </span>
          <span id="error" className="authform__error">
            {messageError}
          </span>
        </fieldset>

        <button
          disabled={!isValid}
          className={`authform__form-button ${
            !isValid && "authform__form-button_disabled"
          }`}
          type="submit"
          name="button"
        >
          {authForm === "register" && "Зарегистрироваться"}
          {authForm === "login" && "Войти"}
        </button>
        {authForm === "register" && (
          <div className="authform__form-text">
            {`Уже зарегистрированы? `}
            <Link to="/signin" className="authform__link hover">
              Войти
            </Link>
          </div>
        )}
        {authForm === "login" && (
          <div className="authform__form-text">
            {`Ещё не зарегистрированы? `}
            <Link to="/signup" className="authform__link hover">
              Регистрация
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}

export default React.memo(AuthForm);
