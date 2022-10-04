import "./NavTab.css";

function NavTab() {
  return (
    <section className="navtab">
      <button
        // onClick={#}
        className="navtab__button"
        type="button"
      >
        О проекте
      </button>
      <button
        // onClick={#}
        className="navtab__button"
        type="button"
      >
        Технологии
      </button>
      <button
        // onClick={#}
        className="navtab__button"
        type="button"
      >
        Студент
      </button>
    </section>
  );
}

export default NavTab;
