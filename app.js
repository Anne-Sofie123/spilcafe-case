"use strict";

const gameList = document.querySelector("#movie-list");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const genreSelect = document.querySelector("#genre-select");
const countText = document.querySelector("#movie-count");

// 🎮 SPIL DATA (ALT BEVARET + FIXET STRUKTUR)
let games = [
  {
    id: 1,
    title: "Matador",
    description: "Dansk klassiker inspireret af Monopoly.",
    image: "https://content.gucca.dk/screenshots/original/m/a/matador_111121_3.jpg",
    genre: ["Klassisk"],
    rating: 5,
  },
  {
    id: 2,
    title: "Catan Junior",
    description: "Strategispil for børn.",
    image: "https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Fwww.bog-ide.dk%2Fproducts%2Fcatan-junior-2540364%3Fsrsltid%3DAU7gw4WpKahbNqsFaMsWt1XkGURWm-gat5flKXJpxsvlGH2DBg2qWHq0&ved=0CBYQjRxqFwoTCMDBse2mh5cDFQAAAAAdAAAAABA2&opi=89978449",
    genre: ["Strategi"],
    rating: 4.8,
  },
  {
    id: 3,
    title: "Sequence",
    description: "Kort- og brætspil kombination.",
    image: "https://lad-os-spille.dk/wp-content/uploads/2022/02/Catan-junior-travel-rejseudgave-lad-os-spille.png",
    genre: ["Strategi"],
    rating: 3.8,
  },
  {
    id: 4,
    title: "Det dårlige selskab - for hele familien",
    description: "Partyspil for alle.",
    image: "https://owp.klarna.com/product/232x232/3245818198/For-Hele-Familien%21.jpg?ph=true",
    genre: ["Party"],
    rating: 4.8,
  },
  {
    id: 5,
    title: "Partners",
    description: "Holdbaseret brætspil.",
    image: "https://spilregler.dk/wp-content/uploads/2018/12/Partners-300x300.png",
    genre: ["Strategi"],
    rating: 4.8,
  },
  {
    id: 6,
    title: "Det burde man jo vide",
    description: "Quizspil med sjove spørgsmål.",
    image: "https://www.hyggeonkel.dk/static/grafik/produktbilleder/det-burde-man-jo-vide-ja-eller-nej/cache/01-det-burde-man-jo-vide-ja-eller-nej-op-wm.jpg?v=1601372784",
    genre: ["Quiz"],
    rating: 4.8,
  },
  {
    id: 7,
    title: "Hint - partyspillet",
    description: "Gæt og tegn spil.",
    image: "https://www.hyggeonkel.dk/static/grafik/produktbilleder/hint/cache/01-hint-2025-op-wm.jpg?v=1756219719",
    genre: ["Party"],
    rating: 4.9,
  },
  {
    id: 8,
    title: "Ticket to Ride",
    description: "Togstrategi spil.",
    image: "https://www.bog-ide.dk/cdn/shop/files/1100398_ftp_2c448503-a741-4583-9f57-638715489b93.jpg?v=1788759691&width=1000",
    genre: ["Strategi"],
    rating: 3.2,
  },
  {
    id: 9,
    title: "Monopoly",
    description: "Køb og handel med ejendomme.",
    image: "https://image-resizing.booztcdn.com/monopoly/mooc1009797_cmulticoloured.webp?has_webp=1&version=1a6b8a6dd1d0a13e6e451bfec2c896c7&size=w900",
    genre: ["Klassisk"],
    rating: 5.5,
  },
  {
    id: 10,
    title: "Det dårlige selskab",
    description: "Partyspil for voksne.",
    image: "https://www.hyggeonkel.dk/static/grafik/produktbilleder/det-daarlige-selskab-1759205423/cache/01-det-daarlige-selskab-1759205423-2025-for-wm.jpg",
    genre: ["Party"],
    rating: 4.9,
  }
];

// 🚀 START
renderGames(games);
populateGenres();

// 🎯 GENRES
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

// 🎮 RENDER (STABIL VERSION)
function renderGames(list) {
  gameList.innerHTML = "";
  countText.textContent = "Find dit næste spil";

  const limited = list.slice(0, 10);

  limited.forEach(game => {
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

// 🪟 DIALOG
function showDialog(game) {
  const dialog = document.querySelector("#movie-dialog");
  const content = document.querySelector("#dialog-content");

  content.innerHTML = `
    <img src="${game.image}" alt="${game.title}">
    <h2>${game.title}</h2>
    <p>${game.description}</p>
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

// 👂 EVENTS
searchInput.addEventListener("input", updateGames);
genreSelect.addEventListener("change", updateGames);
sortSelect.addEventListener("change", updateGames);


