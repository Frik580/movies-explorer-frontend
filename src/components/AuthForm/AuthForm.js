import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AuthForm.css";
import { useForm } from "react-hook-form";

function AuthForm({ messageError, onRegister, onLogin, authForm }) {
  const inputRef = useRef();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
  });

  const { ref, ...rest } = register("email", {
    required: "Поле обязательно к заполнению",
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Введите адрес электронной почты",
    },
  });

  useEffect(() => {
    reset();
    inputRef.current.focus();
  }, [authForm, reset]);

  const onHandle = (data) => {
    authForm === "register" &&
      onRegister({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    authForm === "login" &&
      onLogin({ email: data.email, password: data.password });
  };

  return (
    <div className="authform">
      <Link to="/" className="authform__logo hover-button" />
      <form
        onSubmit={handleSubmit(onHandle)}
        className="authform__form"
        noValidate
      >
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
              {...register("name", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[A-Za-zа-яА-я -]+$/,
                  message:
                    "поле может содержать только буквы, пробел или дефис",
                },
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
                maxLength: {
                  value: 30,
                  message: "Максимум 30 символов",
                },
              })}
              type="text"
              className="authform__form-item"
              placeholder="Имя"
            />
            <span id="authform-error" className="authform__error">
              {errors?.name && <p>{errors?.name?.message ?? "Error!!!"}</p>}
            </span>
          </fieldset>
        )}

        <fieldset className="authform__form-conteiner">
          <label htmlFor="email" className="authform__form-label">
            E-mail
          </label>
          <input
            {...rest}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            type="email"
            className="authform__form-item"
            placeholder="Email"
          />
          <span id="authform-error" className="authform__error">
            {errors?.email && <p>{errors?.email?.message ?? "Error!!!"}</p>}
          </span>
        </fieldset>

        <fieldset className="authform__form-conteiner">
          <label htmlFor="password" className="authform__form-label">
            Пароль
          </label>
          <input
            {...register("password", {
              required: "Поле обязательно к заполнению",
            })}
            type="password"
            className="authform__form-item authform__form-item_color_pink"
            placeholder="Пароль"
          />
          <span id="authform-error" className="authform__error">
            {errors?.password && (
              <p>{errors?.password?.message ?? "Error!!!"}</p>
            )}
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
