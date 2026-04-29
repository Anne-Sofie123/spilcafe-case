"use strict";

const gameList = document.querySelector("#movie-list");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const genreSelect = document.querySelector("#genre-select");
const countText = document.querySelector("#movie-count");

// 🎮 SPIL + BILLEDER SAMMEN (FIXET)
let games = [
  { title: "Catan Junior", genre: ["Strategi"], rating: 4.8, image: "https://image.bog-ide.dk/2670261-1075942-1000-1000/webp/0/1000/2670261-1075942-1000-1000.webp" },
  { title: "Sequence", genre: ["Strategi"], rating: 3.8, image: "https://image.bog-ide.dk/2191954-1098986-1000-797/jpg/0/720/2191954-1098986-1000-797.jpg" },
  { title: "Det dårlige selskab - for hele familien", genre: ["Party"], rating: 4.8, image: "https://owp.klarna.com/product/232x232/3245818198/For-Hele-Familien%21.jpg?ph=true" },
  { title: "Partners", genre: ["Strategi"], rating: 4.8, image: "https://spilregler.dk/wp-content/uploads/2018/12/Partners-300x300.png" },
  { title: "Det burde man jo vide", genre: ["Quiz"], rating: 4.8, image: "https://image.bog-ide.dk/2682991-307415-1000-1000/webp/0/828/2682991-307415-1000-1000.webp" },
  { title: "Hint - partyspillet", genre: ["Party"], rating: 4.9, image: "https://image.bog-ide.dk/5744789-1524823-1000-1000/webp/0/1000/5744789-1524823-1000-1000.webp" },
  { title: "Matador", genre: ["Klassisk"], rating: 5, image: "https://content.gucca.dk/screenshots/original/m/a/matador_111121_3.jpg" },
  { title: "Ticket to Ride", genre: ["Strategi"], rating: 3.2, image: "https://image.bog-ide.dk/1900731-650524-999-1000/webp/0/828/1900731-650524-999-1000.webp" },
  { title: "Monopoly", genre: ["Klassisk"], rating: 5.5, image: "https://image.bog-ide.dk/4786036-1086187-1000-1000/webp/0/828/4786036-1086187-1000-1000.webp" },
  { title: "Det dårlige selskab", genre: ["Party"], rating: 4.9, image: "https://image.bog-ide.dk/2756017-344117-1000-1000/webp/0/828/2756017-344117-1000-1000.webp" }
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

// 🎮 RENDER (FIXET)
function renderGames(list) {
  gameList.innerHTML = "";
  countText.textContent = "Find dit næste spil";

  const limited = list.slice(0, 10);

  limited.forEach((game) => {

    const html = `
      <article class="movie-card">
        <img class="movie-image ${game.title === "Matador" ? "matador-image" : ""}" 
             src="${game.image}" 
             alt="${game.title}">
        <div class="movie-info">
          <h2>${game.title}</h2>
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

// 🪟 DIALOG (FIXET)
function showDialog(game) {
  const dialog = document.querySelector("#movie-dialog");
  const content = document.querySelector("#dialog-content");

  content.innerHTML = `
    <img src="${game.image}" alt="${game.title}">
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