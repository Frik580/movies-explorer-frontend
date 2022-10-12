import "./Portfolio.css";
import arrow from "../../../images/arrow.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://github.com/Frik580/how-to-learn"
            className="portfolio__text hover"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <img src={arrow} className="portfolio__arrow-pic" alt="Стрелка" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://frik580.github.io/russian-travel/"
            className="portfolio__text hover"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <img src={arrow} className="portfolio__arrow-pic" alt="Стрелка" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://metric.students.nomorepartiesxyz.ru/"
            className="portfolio__text hover"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <img src={arrow} className="portfolio__arrow-pic" alt="Стрелка" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
