import "./Footer.css";

function Footer() {
  const date = new Date();

  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__border"></div>
      <div className="footer__conteiner">
        <p className="footer__copyright">&#169; {date.getFullYear()}</p>
        <a className="footer__link hover" href="https://practicum.yandex.ru">
          Яндекс.Практикум
        </a>
        <a className="footer__link hover" href="https://github.com/yandex-praktikum">
          Github
        </a>
      </div>
    </footer>
  );
}

export default Footer;
