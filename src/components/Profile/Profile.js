import "./Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="profile">
      <form className="profile__form" noValidate>
        <h3 className="profile__form-title">Привет, Виталий!</h3>
        <fieldset className="profile__form-conteiner">
          <label htmlFor="name" className="profile__form-label">
            Имя
          </label>
          <input
            type="text"
            name="name"
            className="profile__form-item"
            minLength="2"
            maxLength="30"
            placeholder="Виталий"
            required
          />
          <span id="user-name-error" className="error"></span>
        </fieldset>
        <fieldset className="profile__form-conteiner">
          <label htmlFor="email" className="profile__form-label">
            E-mail
          </label>
          <input
            type="text"
            name="email"
            className="profile__form-item"
            minLength="2"
            maxLength="30"
            placeholder="pochta@yandex.ru"
            required
          />
          <span id="about-error" className="error"></span>
        </fieldset>

        <button
          className={`hover profile__form-button`}
          type="submit"
          name="button"
        >
          Редактировать
        </button>
        <Link to="/" className="profile__link hover">
          Выйти из аккаунта
        </Link>
      </form>
    </div>
  );
}

export default Profile;
