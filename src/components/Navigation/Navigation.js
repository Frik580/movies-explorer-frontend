import React from "react";
import "./Navigation.css";
import { Link, Routes, Route } from "react-router-dom";

function Navigation({ isOpen, onClose }) {
  return (
    <div onClick={onClose} className={`popup ${isOpen && "popup_opened"}`}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="popup__navigation"
      >
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
        />
        <Routes>
          <Route
            path="movies"
            element={
              <>
                <Link
                  to="/"
                  className="popup__text popup__text_link hover"
                  onClick={onClose}
                >
                  Главная
                </Link>
                <p className="popup__text">Фильмы</p>
                <Link to="/saved-movies" className="popup__text popup__text_link hover">
                  Сохранённые фильмы
                </Link>
                <Link to="/profile" className="popup__profile-button popup__profile-button_link">
                  Аккаунт
                </Link>
              </>
            }
          />
          <Route
            path="saved-movies"
            element={
              <>
                <Link
                  to="/"
                  className="popup__text popup__text_link hover"
                  onClick={onClose}
                >
                  Главная
                </Link>
                <Link to="/movies" className="popup__text popup__text_link hover">
                  Фильмы
                </Link>
                <p className="popup__text">Сохранённые фильмы</p>
                <Link to="/profile" className="popup__profile-button popup__profile-button_link">
                  Аккаунт
                </Link>
              </>
            }
          />
          <Route
            path="profile"
            element={
              <>
                <Link
                  to="/"
                  className="popup__text popup__text_link hover"
                  onClick={onClose}
                >
                  Главная
                </Link>
                <Link to="/movies" className="popup__text popup__text_link hover">
                  Фильмы
                </Link>
                <Link to="/saved-movies" className="popup__text popup__text_link hover">
                  Сохранённые фильмы
                </Link>
                <p className="popup__profile-button">Аккаунт</p>
              </>
            }
          />
          <Route path="*" element={<></>} />
        </Routes>
      </div>
    </div>
  );
}

export default React.memo(Navigation);
