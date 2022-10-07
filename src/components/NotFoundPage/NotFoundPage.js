import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfoundpage">
      <h3 className="notfoundpage__title">404</h3>
      <p className="notfoundpage__text">Страница не найдена</p>
      <button className="notfoundpage__button hover" onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
}

export default NotFoundPage;
