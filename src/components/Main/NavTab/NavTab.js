import "./NavTab.css";
import { Link, Routes, Route } from "react-router-dom";

function NavTab() {
  return (
    <section className="navtab">
      <a className="navtab__button" href="#aboutproject">
        О проекте
      </a>
      <a className="navtab__button" href="#techs">
        Технологии
      </a>
      <a className="navtab__button" href="#aboutme">
        Студент
      </a>
    </section>
  );
}

export default NavTab;
