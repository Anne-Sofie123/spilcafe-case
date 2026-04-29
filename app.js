"use strict";

const URL =
  "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json";

let allMovies = [];

const movieList = document.querySelector("#movie-list");
const genreSelect = document.querySelector("#genre-select");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const movieCount = document.querySelector("#movie-count");

fetchMovies();

async function fetchMovies() {
  const res = await fetch(URL);
  allMovies = await res.json();

  populateGenres();
  renderMovies(allMovies);
}

function populateGenres() {
  const genres = new Set();

  allMovies.forEach(movie => {
    movie.genre.forEach(g => genres.add(g));
  });

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });
}

function renderMovies(movies) {
  movieList.innerHTML = "";

  movieCount.textContent = `Viser ${movies.length} film`;

  movies.forEach(movie => {
    const html = `
      <article class="movie-card">
        <img class="movie-image" src="${movie.image}" alt="${movie.title}">
        <div class="movie-info">
          <h2>${movie.title} (${movie.year})</h2>
          <p>${movie.genre.join(", ")}</p>
          <p>⭐ ${movie.rating}</p>
        </div>
      </article>
    `;

    movieList.insertAdjacentHTML("beforeend", html);

    const card = movieList.lastElementChild;
    card.addEventListener("click", () => showDialog(movie));
  });
}

function showDialog(movie) {
  const dialog = document.querySelector("#movie-dialog");
  const content = document.querySelector("#dialog-content");

  content.innerHTML = `
    <img src="${movie.image}" alt="${movie.title}">
    <h2>${movie.title}</h2>
    <p>${movie.description}</p>
    <p>⭐ ${movie.rating}</p>
  `;

  dialog.showModal();
}

function filterAndSort() {
  let movies = [...allMovies];

  const search = searchInput.value.toLowerCase();
  const genre = genreSelect.value;
  const sort = sortSelect.value;

  movies = movies.filter(movie => {
    const matchSearch = movie.title.toLowerCase().includes(search);
    const matchGenre = genre === "all" || movie.genre.includes(genre);
    return matchSearch && matchGenre;
  });

  if (sort === "title") {
    movies.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "year") {
    movies.sort((a, b) => b.year - a.year);
  }

  if (sort === "rating") {
    movies.sort((a, b) => b.rating - a.rating);
  }

  renderMovies(movies);
}

searchInput.addEventListener("input", filterAndSort);
genreSelect.addEventListener("change", filterAndSort);
sortSelect.addEventListener("change", filterAndSort);