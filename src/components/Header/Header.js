import "./Header.css";
import { Link, Routes, Route } from "react-router-dom";

function Header({ onOpenNavigation }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <header className="header">
            <p className="header__logo"></p>
            <Link to="/signup" className="header__link-register hover">
              Регистрация
            </Link>
            <Link to="/signin" className="header__enter-button hover-button">
              Войти
            </Link>
          </header>
        }
      />
      <Route
        path="movies"
        element={
          <header className="header">
            <p className="header__logo"></p>
            <div className="header__conteiner">
              <p className="header__text">Фильмы</p>
              <Link
                to="/saved-movies"
                className="header__text header__text_link hover"
              >
                Сохранённые фильмы
              </Link>
              <Link
                to="/profile"
                className="header__profile-button header__profile-button_link hover-button"
              >
                Аккаунт
              </Link>
            </div>
            <button
              onClick={onOpenNavigation}
              className="header__burger-button hover-button"
              type="button"
            />
          </header>
        }
      />
      <Route
        path="saved-movies"
        element={
          <header className="header">
            <p className="header__logo"></p>
            <div className="header__conteiner">
              <Link
                to="/movies"
                className="header__text header__text_link hover"
              >
                Фильмы
              </Link>
              <p className="header__text">Сохранённые фильмы</p>
              <Link
                to="/profile"
                className="header__profile-button header__profile-button_link hover-button"
              >
                Аккаунт
              </Link>
            </div>
            <button
              onClick={onOpenNavigation}
              className="header__burger-button hover-button"
              type="button"
            />
          </header>
        }
      />
      <Route
        path="profile"
        element={
          <header className="header">
            <p className="header__logo"></p>
            <div className="header__conteiner">
              <Link
                to="/movies"
                className="header__text header__text_link hover"
              >
                Фильмы
              </Link>
              <Link
                to="/saved-movies"
                className="header__text header__text_link hover"
              >
                Сохранённые фильмы
              </Link>
              <p className="header__profile-button">Аккаунт</p>
            </div>
            <button
              onClick={onOpenNavigation}
              className="header__burger-button hover-button"
              type="button"
            />
          </header>
        }
      />
      <Route path="*" element={<></>} />
    </Routes>
  );
}

export default Header;
