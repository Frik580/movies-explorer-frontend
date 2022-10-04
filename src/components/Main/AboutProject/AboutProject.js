import "./AboutProject.css";
import MainHeader from "../MainHeader/MainHeader";

function AboutProject() {
  return (
    <section className="aboutproject">
      <MainHeader title={"О проекте"} />
      <div className="aboutproject__conteiner">
        <div className="aboutproject__text">
          <p className="aboutproject__paragraph">
            Дипломный проект включал 5 этапов
          </p>
          <p className="aboutproject__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="aboutproject__text">
          <p className="aboutproject__paragraph">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="aboutproject__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="aboutproject__conteiner">
        <div className="aboutproject__column">
          <p className="aboutproject__column-graph aboutproject__column-graph_color_aquamarine">
            1 неделя
          </p>
          <p className="aboutproject__column-text">Back-end</p>
        </div>
        <div className="aboutproject__column">
          <p className="aboutproject__column-graph aboutproject__column-graph_color_gray">
            4 недели
          </p>
          <p className="aboutproject__column-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
