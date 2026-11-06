const animeList = [
{
id: 1,
title: "Demon Slayer",
genre: "Action",
year: 2019,
rating: "9.2",
status: "Popular",
image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
description: "Tanjiro memulai perjalanan untuk menyelamatkan adiknya dan membasmi iblis."
},
{
id: 2,
title: "Jujutsu Kaisen",
genre: "Action",
year: 2020,
rating: "9.1",
status: "Popular",
// Jujutsu Kaisen
image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
description: "Yuji Itadori memasuki dunia penyihir jujutsu yang penuh kutukan."
},
{
id: 3,
title: "One Piece",
genre: "Adventure",
year: 1999,
rating: "9.5",
status: "Popular",
// One Piece
image: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg",
description: "Petualangan Luffy dan kru Topi Jerami mencari harta karun legendaris."
},
{
id: 4,
title: "Solo Leveling",
genre: "Fantasy",
year: 2024,
rating: "9.4",
status: "Latest",
// Solo Leveling
image: "https://cdn.myanimelist.net/images/anime/1801/142390.jpg",
description: "Sung Jinwoo berjuang menjadi hunter terkuat."
},
{
id: 5,
title: "Blue Lock",
genre: "Sport",
year: 2022,
rating: "8.8",
status: "Latest",
// Blue Lock
image: "https://cdn.myanimelist.net/images/anime/1258/126929.jpg",
description: "Para pemain muda bersaing menjadi striker terbaik Jepang."
},
{
id: 6,
title: "Spy x Family",
genre: "Comedy",
year: 2022,
rating: "8.9",
status: "Latest",
// Spy x Family
image: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
description: "Seorang mata-mata membangun keluarga palsu dengan rahasia masing-masing."
},
{
id: 7,
title: "Attack on Titan",
genre: "Action",
year: 2013,
rating: "9.5",
status: "Popular",
// Attack on Titan
image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
description: "Manusia berjuang bertahan hidup dari ancaman para Titan."
},
{
id: 8,
title: "Haikyuu",
genre: "Sport",
year: 2014,
rating: "9.0",
status: "Latest",
// Haikyuu
image: "https://cdn.myanimelist.net/images/anime/7/76014.jpg",
description: "Perjalanan Hinata mengejar impiannya menjadi pemain voli hebat."
}
];

const animeContainer = document.getElementById("animeContainer");
const latestContainer = document.getElementById("latestContainer");
const searchInput = document.getElementById("searchInput");

let favorites = JSON.parse(localStorage.getItem("nezuFavorites")) || [];
let history = JSON.parse(localStorage.getItem("nezuHistory")) || [];

function createAnimeCard(anime) {
const isFavorite = favorites.includes(anime.id);

return `
<article class="anime-card">
<div class="anime-image-wrapper">
<img class="anime-image"
src="${anime.image}"
alt="${anime.title}"
loading="lazy"
onclick="showAnimeDetail(${anime.id})">

    <button class="favorite-button ${isFavorite ? "active" : ""}"
      onclick="toggleFavorite(${anime.id})">
      ${isFavorite ? "♥" : "♡"}
    </button>

    <span class="anime-rating">★ ${anime.rating}</span>
  </div>

  <div class="anime-info">
    <h3>${anime.title}</h3>
    <p>${anime.year} • ${anime.genre}</p>
    <button class="detail-button"
      onclick="showAnimeDetail(${anime.id})">
      Lihat Detail
    </button>
  </div>
</article>

`;
}

function renderAnime(list = animeList) {
const popular = list.filter(a => a.status === "Popular");
const latest = list.filter(a => a.status === "Latest");

if (animeContainer) {
animeContainer.innerHTML = popular.length
? popular.map(createAnimeCard).join("")
: "<p>Anime tidak ditemukan.</p>";
}

if (latestContainer) {
latestContainer.innerHTML = latest.length
? latest.map(createAnimeCard).join("")
: "<p>Anime tidak ditemukan.</p>";
}
}

function toggleFavorite(id) {
if (favorites.includes(id)) {
favorites = favorites.filter(item => item !== id);
} else {
favorites.push(id);
}

localStorage.setItem("nezuFavorites", JSON.stringify(favorites));
renderAnime();
}

function showAnimeDetail(id) {
const anime = animeList.find(a => a.id === id);
if (!anime) return;

history = [id, ...history.filter(item => item !== id)].slice(0, 20);
localStorage.setItem("nezuHistory", JSON.stringify(history));

let modal = document.getElementById("nezuModal");

if (!modal) {
modal = document.createElement("div");
modal.id = "nezuModal";
modal.className = "nezu-modal";
document.body.appendChild(modal);
}

modal.innerHTML = `
<div class="nezu-modal-content">
<button class="modal-close" onclick="closeAnimeDetail()">×</button>

  <img src="${anime.image}" alt="${anime.title}">

  <div class="modal-info">
    <h2>${anime.title}</h2>
    <p>★ ${anime.rating} | ${anime.year} | ${anime.genre}</p>
    <p>${anime.description}</p>

    <button onclick="toggleFavorite(${anime.id}); showAnimeDetail(${anime.id})">
      ${favorites.includes(anime.id) ? "♥ Hapus Favorit" : "♡ Tambah Favorit"}
    </button>

    <p class="coming-soon">
      Episode resmi akan tersedia setelah NEZU memperoleh izin penayangan.
    </p>
  </div>
</div>

`;

modal.style.display = "flex";
}

function closeAnimeDetail() {
const modal = document.getElementById("nezuModal");
if (modal) modal.style.display = "none";
}

function showFavorites() {
const favoriteAnime = animeList.filter(a => favorites.includes(a.id));
showCustomSection("Anime Favorit", favoriteAnime);
}

function showHistory() {
const historyAnime = history
.map(id => animeList.find(a => a.id === id))
.filter(Boolean);

showCustomSection("Riwayat Ditonton", historyAnime);
}

function showCustomSection(title, list) {
if (!animeContainer || !latestContainer) return;

animeContainer.innerHTML = `

  <h2 class="custom-heading">${title}</h2>
  ${
    list.length
      ? list.map(createAnimeCard).join("")
      : "<p>Belum ada anime di daftar ini.</p>"
  }
`;latestContainer.innerHTML = "";
}

function searchAnime(keyword) {
const value = keyword.trim().toLowerCase();

const results = animeList.filter(a =>
a.title.toLowerCase().includes(value) ||
a.genre.toLowerCase().includes(value)
);

if (animeContainer) {
animeContainer.innerHTML = results.length
? results.map(createAnimeCard).join("")
: "<p>Anime tidak ditemukan.</p>";
}

if (latestContainer) latestContainer.innerHTML = "";
}

if (searchInput) {
searchInput.addEventListener("input", event => {
const keyword = event.target.value;

if (keyword.trim() === "") {
  renderAnime();
} else {
  searchAnime(keyword);
}

});
}

// Navigasi favorit dan riwayat
document.querySelectorAll(".sidebar a").forEach(link => {
link.addEventListener("click", event => {
const target = link.getAttribute("href");

if (target === "#favorit") {
  event.preventDefault();
  showFavorites();
}

if (target === "#riwayat") {
  event.preventDefault();
  showHistory();
}

const sidebar = document.querySelector(".sidebar");
if (sidebar) sidebar.classList.remove("open");

});
});

// Menu HP
const menuButton = document.getElementById("menuButton");
const sidebar = document.querySelector(".sidebar");

if (menuButton && sidebar) {
menuButton.addEventListener("click", () => {
sidebar.classList.toggle("open");
});
}

// Tambahkan tampilan modal
const modalStyle = document.createElement("style");

modalStyle.textContent = `
.nezu-modal {
display: none;
position: fixed;
inset: 0;
z-index: 9999;
background: rgba(0,0,0,.88);
justify-content: center;
align-items: center;
padding: 20px;
overflow-y: auto;
}

.nezu-modal-content {
background: #191525;
color: white;
width: 100%;
max-width: 650px;
border-radius: 16px;
overflow: hidden;
position: relative;
}

.nezu-modal-content img {
width: 100%;
max-height: 350px;
object-fit: contain;
background: #100d18;
}

.modal-info {
padding: 20px;
}

.modal-info h2 {
margin-bottom: 10px;
}

.modal-info button {
background: #8b5cf6;
color: white;
border: none;
border-radius: 8px;
padding: 12px 18px;
margin-top: 15px;
}

.modal-close {
position: absolute;
top: 10px;
right: 12px;
z-index: 2;
border: none;
background: #8b5cf6;
color: white;
font-size: 25px;
width: 38px;
height: 38px;
border-radius: 50%;
}

.coming-soon {
color: #b9a4ed;
margin-top: 20px;
font-size: 13px;
}

.custom-heading {
grid-column: 1 / -1;
margin-bottom: 15px;
}
`;

document.head.appendChild(modalStyle);

// Tampilkan katalog
renderAnime();