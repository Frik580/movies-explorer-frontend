import "./AboutMe.css";
import MainHeader from "../MainHeader/MainHeader";
import Portfolio from "../Portfolio/Portfolio";
import photo from "../../../images/photo.png";

function AboutMe() {
  return (
    <section className="aboutme">
      <MainHeader title={"Студент"} />
      <div className="aboutme__info">
        <div className="aboutme__description">
          <p className="aboutme__name">Арсений</p>
          <p className="aboutme__job">Фронтенд-разработчик, 39 лет</p>
          <p className="aboutme__text">
            С детства люблю рисовать и программировать, что в последствии
            переросло в увлечение дизайном и программированием. В 2014 году
            закончил Академическую школу дизайна и в течение нескольких лет
            работал 3d-дизайнером в компании Estetica. Профессионально занимаюсь
            горными лыжами, сноубордингом и роллер-спортом. Стараюсь постоянно
            узнавать и пробовать что-то новое. И если мне это нравится,
            продолжаю развивать эти навыки в себе. Уверен, что нужно стремиться
            к тому, чтобы заниматься любимым делом.
          </p>
          <a className="aboutme__link" href="https://github.com/Frik580">
            Github
          </a>
        </div>
        <img src={photo} className="aboutme__photo" alt="Фото" />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
