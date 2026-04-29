"use strict";

const URL =
  "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/movies.json";

let allGames = [];

const gameList = document.querySelector("#movie-list");
const genreSelect = document.querySelector("#genre-select");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const countText = document.querySelector("#movie-count");

// 🖼️ DINE 10 BILLEDER
const images = [
  "https://image.bog-ide.dk/2670261-1075942-1000-1000/webp/0/1000/2670261-1075942-1000-1000.webp",
  "https://image.bog-ide.dk/2191954-1098986-1000-797/jpg/0/720/2191954-1098986-1000-797.jpg",
  "https://owp.klarna.com/product/232x232/3245818198/For-Hele-Familien%21.jpg?ph=true",
  "https://spilregler.dk/wp-content/uploads/2018/12/Partners-300x300.png",
  "https://image.bog-ide.dk/2682991-307415-1000-1000/webp/0/828/2682991-307415-1000-1000.webp",
  "https://image.bog-ide.dk/5744789-1524823-1000-1000/webp/0/1000/5744789-1524823-1000-1000.webp",
  "https://content.gucca.dk/screenshots/original/m/a/matador_111121_3.jpg",
  "https://image.bog-ide.dk/1900731-650524-999-1000/webp/0/828/1900731-650524-999-1000.webp",
  "https://image.bog-ide.dk/4786036-1086187-1000-1000/webp/0/828/4786036-1086187-1000-1000.webp",
  "https://image.bog-ide.dk/2756017-344117-1000-1000/webp/0/828/2756017-344117-1000-1000.webp"
];

// 🚀 START APP
fetchGames();

async function fetchGames() {
  const res = await fetch(URL);
  allGames = await res.json();

  populateGenres();
  renderGames(allGames);
}

// 🎯 GENRES
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

// 🎮 RENDER (KUN 10 SPIL)
function renderGames(games) {
  gameList.innerHTML = "";

  countText.textContent = "Find dit næste spil";

  // 👉 KUN 10 SPIL
  const limitedGames = games.slice(0, 10);

  limitedGames.forEach((game, index) => {
    const html = `
      <article class="movie-card">
        <img class="movie-image" src="${images[index]}" alt="${game.title}">
        <div class="movie-info">
          <h2>${game.title} (${game.year})</h2>
          <p>${game.genre.join(", ")}</p>
          <p>⭐ ${game.rating}</p>
        </div>
      </article>
    `;

    gameList.insertAdjacentHTML("beforeend", html);

    const card = gameList.lastElementChild;
    card.addEventListener("click", () => showDialog(game, index));
  });
}

// 🪟 DIALOG
function showDialog(game, index) {
  const dialog = document.querySelector("#movie-dialog");
  const content = document.querySelector("#dialog-content");

  content.innerHTML = `
    <img src="${images[index]}" alt="${game.title}">
    <h2>${game.title}</h2>
    <p>${game.description}</p>
    <p>⭐ ${game.rating}</p>
  `;

  dialog.showModal();
}

// 🔎 FILTER + SORT
function updateGames() {
  let games = [...allGames];

  const search = searchInput.value.toLowerCase();
  const genre = genreSelect.value;
  const sort = sortSelect.value;

  games = games.filter(game => {
    return (
      game.title.toLowerCase().includes(search) &&
      (genre === "all" || game.genre.includes(genre))
    );
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

// 👂 EVENTS
searchInput.addEventListener("input", updateGames);
genreSelect.addEventListener("change", updateGames);
sortSelect.addEventListener("change", updateGames);