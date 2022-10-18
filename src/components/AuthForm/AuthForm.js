import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AuthForm.css";

function AuthForm({ messageError, onRegister, onLogin, authForm }) {
  const [state, setState] = useState("");
  const inputRefRegister = useRef();
  const inputRefLogin = useRef();
  const isValid = true;

  useEffect(() => {
    setState({ name: "", email: "", password: "" });
    authForm === "register" && inputRefRegister.current.focus();
    authForm === "login" && inputRefLogin.current.focus();
  }, [authForm]);

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authForm === "register" &&
      onRegister({
        name: state.name,
        email: state.email,
        password: state.password,
      });
    authForm === "login" &&
      onLogin({ email: state.email, password: state.password });
  };

  return (
    <div className="authform">
      <Link to="/" className="authform__logo hover-button" />
      <form onSubmit={handleSubmit} className="authform__form">
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
              value={state.name ?? ""}
              onChange={handleInputChange}
              name="name"
              className="authform__form-item"
              placeholder="Имя"
              required
            />
          </fieldset>
        )}
        <fieldset className="authform__form-conteiner">
          <label htmlFor="email" className="authform__form-label">
            E-mail
          </label>
          <input
            type="email"
            ref={inputRefLogin}
            value={state.email ?? ""}
            onChange={handleInputChange}
            name="email"
            className="authform__form-item"
            placeholder="Email"
            required
          />
        </fieldset>
        <fieldset className="authform__form-conteiner">
          <label htmlFor="password" className="authform__form-label">
            Пароль
          </label>
          <input
            type="password"
            value={state.password ?? ""}
            onChange={handleInputChange}
            name="password"
            className="authform__form-item authform__form-item_color_pink"
            placeholder="Пароль"
            required
          />
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
