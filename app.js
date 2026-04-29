"use strict";

const gameList = document.querySelector("#movie-list");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const genreSelect = document.querySelector("#genre-select");
const countText = document.querySelector("#movie-count");

// 🖼️ DINE BILLEDER (i samme rækkefølge som spillene)
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

// 🎮 DINE SPIL (i samme rækkefølge)
let games = [
  { title: "Catan Junior", genre: ["Strategi"], rating: 4.5 },
  { title: "Sequence", genre: ["Strategi"], rating: 4.3 },
  { title: "Det dårlige selskab - for hele familien", genre: ["Party"], rating: 4.2 },
  { title: "Partners", genre: ["Strategi"], rating: 4.4 },
  { title: "Det burde man jo vide", genre: ["Quiz"], rating: 4.1 },
  { title: "Hint - partyspillet", genre: ["Party"], rating: 4.6 },
  { title: "Matador", genre: ["Klassisk"], rating: 4.7 },
  { title: "Ticket to Ride", genre: ["Strategi"], rating: 4.8 },
  { title: "Monopoly", genre: ["Klassisk"], rating: 4.3 },
  { title: "Det dårlige selskab", genre: ["Party"], rating: 4.2 }
];

// 🚀 START
renderGames(games);
populateGenres();

// 🎯 genres
function populateGenres() {
  const genres = new Set();

  games.forEach(game => {
    game.genre.forEach(g => genres.add(g));
  });

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });
}

// 🎮 RENDER
function renderGames(list) {
  gameList.innerHTML = "";

  countText.textContent = "Find dit næste spil";

  const limited = list.slice(0, 10);

  limited.forEach((game, index) => {
    const html = `
      <article class="movie-card">
        <img class="movie-image" src="${images[index]}" alt="${game.title}">
        <div class="movie-info">
          <h2>${game.title}</h2>
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
    <p>Genre: ${game.genre.join(", ")}</p>
    <p>⭐ ${game.rating}</p>
  `;

  dialog.showModal();
}

// 🔎 FILTER + SORT
function updateGames() {
  let filtered = [...games];

  const search = searchInput.value.toLowerCase();
  const genre = genreSelect.value;
  const sort = sortSelect.value;

  filtered = filtered.filter(game => {
    return (
      game.title.toLowerCase().includes(search) &&
      (genre === "all" || game.genre.includes(genre))
    );
  });

  if (sort === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  renderGames(filtered);
}

// 👂 events
searchInput.addEventListener("input", updateGames);
genreSelect.addEventListener("change", updateGames);
sortSelect.addEventListener("change", updateGames);