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
  getUserInfo,
  setUserInfo,
} from "../../utils/MainApi";
import { SHORT_MOVIE_TIME } from "../../utils/Constants";

function App() {
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isFindMovies, setIsFindMovies] = useState(false);
  const [isFindUserMovies, setIsFindUserMovies] = useState(false);
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [isShortUserFilms, setIsShortUserFilms] = useState(false);
  const [isLocal, setIsLocal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [moviesListLocal, setMoviesListLocal] = useState([]);
  const [queryMovies, setQueryMovies] = useState([]);
  const [queryMoviesLocal, setQueryMoviesLocal] = useState([]);
  const [queryUserMovies, setQueryUserMovies] = useState([]);
  const [queryMoviesText, setQueryMoviesText] = useState("");
  const [queryUserMoviesText, setQueryUserMoviesText] = useState("");
  const [moviesSavedList, setMoviesSavedList] = useState([]);
  const [queryMoviesSavedList, setQueryMoviesSavedList] = useState([]);
  const [messageError, setMessageError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [count, setCount] = useState(null);
  const [isButtonNext, setIsButtonNext] = useState(true);
  const navigate = useNavigate();

  // API даннах

  useEffect(() => {
    const checkbox = localStorage.getItem("checkbox");
    const localQuery = JSON.parse(localStorage.getItem("query"));
    const localQueryText = localStorage.getItem("queryText");

    if (localQuery) {
      checkbox === "true" ? setIsShortFilms(true) : setIsShortFilms(false);
      setQueryMoviesLocal(localQuery);
      handleShortFilmsLocal(localQuery);
      setQueryMoviesText(localQueryText);
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    jwt && handleAuth(jwt);
  }, [loggedIn]);

  useEffect(() => {
    console.log(loggedIn);

    if (loggedIn) {
      setIsPreloader(true);
      const promises = [getUserInfo(), getAllMovies()];
      Promise.all(promises)
        .then((results) => {
          setCurrentUser(results[0]);
          const movies = results[1].map(function (movie) {
            if (movie.owner === results[0]._id) {
              return movie;
            }
            return null;
          });
          const filterMovies = movies.filter((item) => item !== null);
          setMoviesSavedList(filterMovies.reverse());
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
    localStorage.removeItem("checkbox");
    localStorage.removeItem("query");
    localStorage.removeItem("queryText");

    setIsShortFilms(false);
    setQueryMoviesText("");
    setQueryUserMoviesText("");
    setMessageError("");
    setIsLocal(false);
    setLoggedIn(false);
    setIsFindUserMovies(false);
    setMoviesList([]);
  };

  // API фронтенд-аутентификации
  const handleAuth = async (jwt) => {
    const content = await getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
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
        setMessageError("Регистрация прошла успешно!");
        setTimeout(() => {
          onLogin({ email, password });
        }, 4000);
        return res;
      })
      .catch((err) => {
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
    authorize(email, password)
      .then((res) => {
        if (res.token) {
          console.log(res.token);
          localStorage.setItem("jwt", res.token);
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

  // Поиск фильмов

  useEffect(() => {
    localStorage.setItem("checkbox", isShortFilms);

    if (!isLocal) {
      handleShortFilms(queryMovies);
    } else {
      handleShortFilmsLocal(queryMoviesLocal);
    }
  }, [isShortFilms]);

  function handleFindMovies(data) {
    setIsLocal(false);
    if (movies.length === 0) {
      setIsPreloader(true);
      getMovies()
        .then((movies) => {
          setMovies(movies);
          query(movies, data);
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
    } else {
      query(movies, data);
    }
  }

  function query(movies, data) {
    const query = movies.filter(function (movie) {
      return movie.nameRU.toLowerCase().includes(data.name.toLowerCase());
    });
    setQueryMovies(query);
    handleShortFilms(query);
    localStorage.setItem("query", JSON.stringify(query));
    setQueryMoviesText(data.name.toLowerCase());
    localStorage.setItem("queryText", data.name.toLowerCase());
    setIsFindMovies(true);
  }

  function handleShortFilms(movies) {
    setCount(null);
    if (isShortFilms) {
      const shortMovies = movies.filter(function (movie) {
        return movie.duration < SHORT_MOVIE_TIME;
      });
      setMoviesList(shortMovies);
    } else {
      setMoviesList(movies);
    }
  }

  function handleShortFilmsLocal(movies) {
    setCount(null);
    if (isShortFilms) {
      const shortMovies = movies.filter(function (movie) {
        return movie.duration < SHORT_MOVIE_TIME;
      });
      setMoviesListLocal(shortMovies);
    } else {
      setMoviesListLocal(movies);
    }
    setIsLocal(true);
  }

  // Поиск фильмов user
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
    setQueryUserMoviesText(data.name.toLowerCase());
    setIsFindUserMovies(true);
  }

  function handleShortUserFilms(movies) {
    if (isShortUserFilms) {
      const shortMovies = movies.filter(function (movie) {
        return movie.duration < SHORT_MOVIE_TIME;
      });
      setQueryMoviesSavedList(shortMovies);
    } else {
      setQueryMoviesSavedList(movies);
    }
  }

  // Добавление фильмов в базу user
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
          if (err === "Ошибка: 400 Bad Request") {
            setMessageError("Фильм не может быть сохранён");
          } else {
            setMessageError("Что-то пошло не так");
          }
        });
    } else {
      console.log("Фильм уже есть");
      const deletedMovie = moviesSavedList.find(
        (item) => item.movieId === data.movieId.toString()
      );
      handleMovieDelete(deletedMovie);
    }
  }

  // Удаление фильмов из базы user
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

  function handleUpdateUser(data) {
    setUserInfo(data)
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 409 Conflict") {
          setMessageError("Этот email занят другим пользователем");
        } else {
          setMessageError("Что-то пошло не так");
        }
      })
      .finally(() => {
        setTimeout(() => {
          setMessageError("");
        }, 4000);
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
                    moviesList={isLocal ? moviesListLocal : moviesList}
                    isFindMovies={isFindMovies}
                    messageError={messageError}
                    isShortFilms={isShortFilms}
                    onShortFilms={() => setIsShortFilms(!isShortFilms)}
                    onMovieLike={handleMovieLike}
                    queryMoviesText={queryMoviesText}
                    moviesSavedList={moviesSavedList}
                    onNextMovies={() => setCount(count + 1)}
                    count={count}
                    onCloseNext={() => setIsButtonNext(false)}
                    onOpenNext={() => setIsButtonNext(true)}
                    isButtonNext={isButtonNext}
                    isErrors={(data) =>
                      data
                        ? setMessageError("Нужно ввести ключевое слово")
                        : setMessageError("")
                    }
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
                    isFindMovies={isFindUserMovies}
                    messageError={messageError}
                    isShortFilms={isShortUserFilms}
                    onShortFilms={() => {
                      setIsShortUserFilms(!isShortUserFilms);
                      setIsFindUserMovies(true);
                    }}
                    onMovieDelete={handleMovieDelete}
                    queryMoviesText={queryUserMoviesText}
                    onCloseNext={() => setIsButtonNext(false)}
                    onOpenNext={() => setIsButtonNext(true)}
                    isErrors={(data) =>
                      data
                        ? setMessageError("Нужно ввести ключевое слово")
                        : setMessageError("")
                    }
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
                <Profile
                  onLogout={onLogout}
                  onUpdateUser={handleUpdateUser}
                  messageError={messageError}
                />
              </ProtectedRoute>
            }
          />

          {!loggedIn && (
            <>
              <Route
                path="signin"
                element={
                  <AuthForm
                    onLogin={onLogin}
                    messageError={messageError}
                    authForm="login"
                  />
                }
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
            </>
          )}

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
