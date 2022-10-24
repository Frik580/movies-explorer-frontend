import "./Profile.css";
import React, { useEffect, useContext, useRef, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";

function Profile({ onLogout, onUpdateUser, messageError }) {
  const currentUser = useContext(CurrentUserContext);
  const inputRef = useRef();
  const [isValidValue, SetIsValidValue] = useState(true);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: "all",
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });

  const name = watch("name");
  const email = watch("email");

  useEffect(() => {
    name === currentUser.name && email === currentUser.email
      ? SetIsValidValue(false)
      : SetIsValidValue(true);
  }, [name, email, currentUser.name, currentUser.email]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { ref, ...rest } = register("name", {
    required: "Поле обязательно к заполнению",
    pattern: {
      value: /^[A-Za-zа-яА-я -]+$/,
      message: "поле может содержать только буквы, пробел или дефис",
    },
    minLength: {
      value: 2,
      message: "Минимум 2 символа",
    },
    maxLength: {
      value: 30,
      message: "Максимум 30 символов",
    },
  });

  const onHandle = (data) => {
    onUpdateUser({
      name: data.name,
      email: data.email,
    });
  };

  return (
    <div className="profile">
      <form
        onSubmit={handleSubmit(onHandle)}
        className="profile__form"
        noValidate
      >
        <h3 className="profile__form-title">{`Привет, ${currentUser.name}!`}</h3>
        <fieldset className="profile__form-conteiner">
          <label htmlFor="name" className="profile__form-label">
            Имя
          </label>
          <input
            {...rest}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            type="text"
            className="profile__form-item"
          />
        </fieldset>
        <span id="about-error" className="profile__form-error">
          {errors?.name && <p>{errors?.name?.message ?? "Error!!!"}</p>}
        </span>
        <fieldset className="profile__form-conteiner">
          <label htmlFor="email" className="profile__form-label">
            E-mail
          </label>
          <input
            {...register("email", {
              required: "Поле обязательно к заполнению",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Введите корректный адрес электронной почты",
              },
            })}
            type="email"
            className="profile__form-item"
          />
        </fieldset>
        <span id="about-error" className="profile__form-error">
          {errors?.email && <p>{errors?.email?.message ?? "Error!!!"}</p>}
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
