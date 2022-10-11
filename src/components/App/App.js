import { useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Navigation from "../Navigation/Navigation";
import AuthForm from "../AuthForm/AuthForm";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);

  return (
    <div className="root">
      <Header onOpenNavigation={() => setIsNavigationPopupOpen(true)} />
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

      <Navigation
        isOpen={isNavigationPopupOpen}
        onClose={() => setIsNavigationPopupOpen(false)}
      />
    </div>
  );
}

export default App;
