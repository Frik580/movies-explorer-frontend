import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AuthForm from "../AuthForm/AuthForm";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="root">
    <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="movies"
          element={
            <>
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="saved-movies"
          element={
            <>
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route
          path="profile"
          element={
            <>
              <Profile />
            </>
          }
        />
        <Route path="signin" element={<AuthForm authForm="login" />} />
        <Route path="signup" element={<AuthForm authForm="register" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
