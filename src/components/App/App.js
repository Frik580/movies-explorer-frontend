import { useState, useEffect } from "react";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getMovies } from "../../utils/MoviesApi";
import {
  register,
  authorize,
  getContent,
  createMovie,
  getAllMovies,
  deleteMovie,
} from "../../utils/MainApi";

function App() {
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isFindMovies, setIsFindMovies] = useState(false);
  const [isFindUserMovies, setIsFindUserMovies] = useState(false);
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [isShortUserFilms, setIsShortUserFilms] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [queryMovies, setQueryMovies] = useState([]);
  const [queryUserMovies, setQueryUserMovies] = useState([]);
  const [queryMoviesText, setQueryMoviesText] = useState("");
  const [queryUserMoviesText, setQueryUserMoviesText] = useState("");
  const [moviesSavedList, setMoviesSavedList] = useState([]);
  const [queryMoviesSavedList, setQueryMoviesSavedList] = useState([]);
  const [messageError, setMessageError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  // API даннах

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    jwt && handleAuth(jwt);
    if (loggedIn) {
      setIsPreloader(true);
      getAllMovies(jwt)
        .then((movies) => {
          console.log(movies);
          setMoviesSavedList(movies);
        })
        .catch((err) => {
          console.log(err);
          setMessageError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
        })
        .finally(() => {
          setIsPreloader(false);
        });
    }
  }, [loggedIn]);

  const onLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  // API фронтенд-аутентификации
  const handleAuth = async (jwt) => {
    const content = await getContent(jwt)
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
          console.log(currentUser);
        } else setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return content;
  };

  const onRegister = ({ name, email, password }) => {
    console.log({ name, email, password });
    register(name, email, password)
      .then((res) => {
        onLogin({ email, password });
        // setIsInfoTooltip(true);
        // navigate("/sign-in");
        return res;
      })
      .catch((err) => {
        // setIsInfoTooltip(true);
        // setIsRegister(false);
        console.log(err);
        setMessageError("Такой пользователь уже существует");
      })
      .finally(() => {
        setTimeout(() => {
          setMessageError("");
        }, 4000);
      });
  };

  const onLogin = ({ email, password }) => {
    console.log({ email, password });

    authorize(email, password)
      .then((res) => {
        if (res.token) {
          console.log(res.token);
          localStorage.setItem("jwt", res.token);
          // const jwt = localStorage.getItem("jwt");
          // api.getJwt(jwt);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
        setMessageError("Что-то пошло не так. Проверьте email и пароль.");
      })
      .finally(() => {
        setTimeout(() => {
          setMessageError("");
        }, 4000);
      });
  };

  useEffect(() => {
    handleShortFilms(queryMovies);
  }, [isShortFilms]);

  function handleFindMovies(data) {
    setIsPreloader(true);
    getMovies()
      .then((movies) => {
        const query = movies.filter(function (movie) {
          return movie.nameRU.toLowerCase().includes(data.name.toLowerCase());
        });
        setQueryMovies(query);
        handleShortFilms(query);
        setQueryMoviesText(
          `Результат поиска по ключу: ${data.name.toLowerCase()}`
        );
        setIsFindMovies(true);
      })
      .catch((err) => {
        console.log(err);
        setMessageError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  function handleShortFilms(movies) {
    if (isShortFilms) {
      const shortMovies = movies.filter(function (movie) {
        return movie.duration < 40;
      });
      setMoviesList(shortMovies);
    } else {
      setMoviesList(movies);
    }
  }

  //user

  useEffect(() => {
    queryUserMovies.length === 0
      ? handleShortUserFilms(moviesSavedList)
      : handleShortUserFilms(queryUserMovies);
  }, [isShortUserFilms]);

  function handleFindUserMovies(data) {
    const query = moviesSavedList.filter(function (movie) {
      return movie.nameRU.toLowerCase().includes(data.name.toLowerCase());
    });
    setQueryUserMovies(query);
    handleShortUserFilms(query);
    setQueryUserMoviesText(
      `Результат поиска по ключу: ${data.name.toLowerCase()}`
    );
    setIsFindUserMovies(true);
  }

  function handleShortUserFilms(movies) {
    if (isShortUserFilms) {
      const shortMovies = movies.filter(function (movie) {
        return movie.duration < 40;
      });
      setQueryMoviesSavedList(shortMovies);
    } else {
      setQueryMoviesSavedList(movies);
    }
  }

  function handleMovieLike({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
  }) {
    const data = {
      country,
      director,
      duration,
      year,
      description,
      image: `https://api.nomoreparties.co${image.url}`,
      trailerLink,
      thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
      movieId: id,
      nameRU,
      nameEN,
    };

    // const list = moviesSavedList.map((movie) => movie.movieId);
    const liked = moviesSavedList.some(
      (item) => item.movieId === data.movieId.toString()
    );

    if (!liked) {
      createMovie(data)
        .then((newMovie) => {
          setMoviesSavedList([newMovie, ...moviesSavedList]);
          setQueryMoviesSavedList([newMovie, ...queryMoviesSavedList]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Фильм уже есть");
      const deletedMovie = moviesSavedList.find(
        (item) => item.movieId === data.movieId.toString()
      );
      handleMovieDelete(deletedMovie);
    }
  }

  function handleMovieDelete(movie) {
    const id = movie._id;
    deleteMovie(movie)
      .then(() => {
        const newList = moviesSavedList.filter(function (movie) {
          return movie._id !== id;
        });
        setMoviesSavedList(newList);
        const newQueryList = queryMoviesSavedList.filter(function (movie) {
          return movie._id !== id;
        });
        setQueryMoviesSavedList(newQueryList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header
          loggedIn={loggedIn}
          onOpenNavigation={() => setIsNavigationPopupOpen(true)}
        />
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
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Movies
                    isPreloader={isPreloader}
                    onFindMovies={handleFindMovies}
                    moviesList={moviesList}
                    isFindMovies={isFindMovies}
                    messageError={messageError}
                    isShortFilms={isShortFilms}
                    onShortFilms={() => setIsShortFilms(!isShortFilms)}
                    onMovieLike={handleMovieLike}
                    queryMoviesText={queryMoviesText}
                    moviesSavedList={moviesSavedList}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <SavedMovies
                    isPreloader={isPreloader}
                    onFindMovies={handleFindUserMovies}
                    moviesList={
                      isFindUserMovies ? queryMoviesSavedList : moviesSavedList
                    }
                    // moviesList={queryMoviesSavedList}
                    isFindMovies={isFindUserMovies}
                    messageError={messageError}
                    isShortFilms={isShortUserFilms}
                    onShortFilms={() => {
                      setIsShortUserFilms(!isShortUserFilms);
                      setIsFindUserMovies(true);
                    }}
                    onMovieDelete={handleMovieDelete}
                    queryMoviesText={queryUserMoviesText}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile onLogout={onLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="signin"
            element={<AuthForm onLogin={onLogin} authForm="login" />}
          />
          <Route
            path="signup"
            element={
              <AuthForm
                onRegister={onRegister}
                messageError={messageError}
                authForm="register"
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Navigation
          isOpen={isNavigationPopupOpen}
          onClose={() => setIsNavigationPopupOpen(false)}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
