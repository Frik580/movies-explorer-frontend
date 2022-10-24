const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
};

export const getMovies = () => {
  return fetch(BASE_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
};
