import React from "react";
import { Link } from "react-router-dom";
import "./AuthForm.css";

function AuthForm({ authForm }) {
  return (
    <div className="authform">
      <p className="authform__logo"></p>
      <form className="authform__form">
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
            name="password"
            className="authform__form-item authform__form-item_color_pink"
            placeholder="Пароль"
            required
          />
          <span id="error" className="authform__error">
            Что-то пошло не так...
          </span>
        </fieldset>

        <button className={`authform__form-button`} type="submit" name="button">
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
