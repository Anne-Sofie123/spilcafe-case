"use strict";

const URL =
  "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json";

let allGames = [];

const gameList = document.querySelector("#movie-list");
const genreSelect = document.querySelector("#genre-select");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const countText = document.querySelector("#movie-count");

// 🚀 start app
fetchGames();

async function fetchGames() {
  const res = await fetch(URL);
  allGames = await res.json();

  populateGenres();
  renderGames(allGames);
}

// 🎯 genres
function populateGenres() {
  const genres = new Set();

  allGames.forEach(game => {
    game.genre.forEach(g => genres.add(g));
  });

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });
}

// 🎮 render spil
function renderGames(games) {
  gameList.innerHTML = "";

  // ✅ NY TEKST HER
  countText.textContent = "Find dit næste spil";

  games.forEach(game => {
    const html = `
      <article class="movie-card">
        <img class="movie-image" src="${game.image}" alt="${game.title}">
        <div class="movie-info">
          <h2>${game.title} (${game.year})</h2>
          <p>${game.genre.join(", ")}</p>
          <p>⭐ ${game.rating}</p>
        </div>
      </article>
    `;

    gameList.insertAdjacentHTML("beforeend", html);

    const card = gameList.lastElementChild;
    card.addEventListener("click", () => showDialog(game));
  });
}

// 🪟 dialog
function showDialog(game) {
  const dialog = document.querySelector("#movie-dialog");
  const content = document.querySelector("#dialog-content");

  content.innerHTML = `
    <img src="${game.image}" alt="${game.title}">
    <h2>${game.title}</h2>
    <p>${game.description}</p>
    <p>⭐ ${game.rating}</p>
  `;

  dialog.showModal();
}

// 🔎 filter + sort
function updateGames() {
  let games = [...allGames];

  const search = searchInput.value.toLowerCase();
  const genre = genreSelect.value;
  const sort = sortSelect.value;

  games = games.filter(game => {
    const matchSearch = game.title.toLowerCase().includes(search);
    const matchGenre = genre === "all" || game.genre.includes(genre);
    return matchSearch && matchGenre;
  });

  if (sort === "title") {
    games.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "year") {
    games.sort((a, b) => b.year - a.year);
  }

  if (sort === "rating") {
    games.sort((a, b) => b.rating - a.rating);
  }

  renderGames(games);
}

// 👂 events
searchInput.addEventListener("input", updateGames);
genreSelect.addEventListener("change", updateGames);
sortSelect.addEventListener("change", updateGames);