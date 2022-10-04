import "./Header.css";
// import { Link, Routes, Route } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <p className="header__logo"></p>
      <div className="header__conteiner">
        {/* <Routes>
          <Route
            path="/"
            element={ */}
              <>
                <p
                  // onClick={#}
                  className="header__link"
                >
                  Регистрация
                </p>
                <button
                  // onClick={#}
                  className="header__enter-button"
                  type="button"
                >
                  Войти
                </button>
              </>
            {/* }
          />
          <Route
            path="sign-in"
            element={
              <Link to="/sign-up" className="link hover">
                Регистрация
              </Link>
            }
          />
          <Route
            path="sign-up"
            element={
              <Link to="/sign-in" className="link hover">
                Войти
              </Link>
            }
          />
        </Routes> */}
      </div>
    </header>
  );
}

export default Header;
