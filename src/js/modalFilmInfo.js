import MovieApiId from './movieAPI';
const apiById = new MovieApiId();

import movieInfohbs from '../partials/handleBars.hbs/modalFilmInfo.hbs';

const modalFilmInfo = document.querySelector('.backdrop');
const moviesOnGallery = document.querySelector('.gallery');

moviesOnGallery.addEventListener('click', getMovie);
modalFilmInfo.addEventListener('click', addRemoveToListBtns);
document.addEventListener('keydown', e => {
  if (e.code === 'Escape') modalFilmInfo.classList.add('goodby_modal');
  return;
});

async function getMovie(e) {
  const card = e.target.closest('.gallery_item');

  if (card) {
    const cardId = card.dataset.id;

    apiById.movieId = cardId;
    const movieById = await apiById.DetailedMovieInfo(cardId);
    sessionStorage.setItem('currentMovie', JSON.stringify(movieById));

    modalFilmInfo.classList.remove('goodby_modal');
    renderModalFilmInfo(movieById);
    checkLocalStorageWatched(Number(cardId));
    checkLocalStorageQueue(Number(cardId));
  }
}

function renderModalFilmInfo(res) {
  modalFilmInfo.insertAdjacentHTML('beforeend', movieInfohbs(res));

  const element = modalFilmInfo.querySelector('.backdrop_genres');
  const element1 = element.textContent.slice(0, -26);
  element.textContent = element1;
}

function checkLocalStorageWatched(id) {
  const checkStorage = JSON.parse(localStorage.getItem(`watched`)) || [];

  const idsCheckStorage = checkStorage.map(item => item.id);
  const selectBtn = modalFilmInfo.querySelector(`button[data-action="watched"]`);

  if (!idsCheckStorage.includes(id)) {
    selectBtn.textContent = `ADD TO WATCHED`;
    return;
  }

  selectBtn.textContent = `REMOVE FROM WATCHED`;
}

function checkLocalStorageQueue(id) {
  const checkStorage = JSON.parse(localStorage.getItem(`queue`)) || [];

  const idsCheckStorage = checkStorage.map(item => item.id);
  const selectBtn = modalFilmInfo.querySelector(`button[data-action="queue"]`);

  if (!idsCheckStorage.includes(id)) {
    selectBtn.textContent = `ADD TO QUEUE`;
    return;
  }

  selectBtn.textContent = `REMOVE FROM QUEUE`;
}

function addRemoveToListBtns(e) {
  const checkBtn = e.target.dataset.action;
  const movie = JSON.parse(sessionStorage.getItem('currentMovie'));

  if (checkBtn === 'watched') {
    addRemoveFromStorage(movie, checkBtn);
    checkQueueStorage(movie);
    return;
  }
  if (checkBtn === 'queue') {
    addRemoveFromStorage(movie, checkBtn);
    checkWatchedStorage(movie, checkBtn);
    return;
  }
  if (checkBtn === 'closeBackdrop' || modalFilmInfo) {
    modalFilmInfo.classList.add('goodby_modal');
    modalFilmInfo.innerHTML = '';
    return;
  }
}

function addRemoveFromStorage(movie, title) {
  const moviesWatched = JSON.parse(localStorage.getItem(`${title}`) || '[]');
  const selectBtn = modalFilmInfo.querySelector(`button[data-action="${title}"]`);
  const moviesId = moviesWatched.map(item => item.id);

  if (!moviesId.includes(movie.id)) {
    moviesWatched.push(movie);
    localStorage.setItem(`${title}`, JSON.stringify(moviesWatched));

    selectBtn.textContent = `REMOVE FROM ${title.toUpperCase()}`;
    return;
  }
  const movieIndex = moviesWatched.findIndex(item => item.id === movie.id);
  moviesWatched.splice(movieIndex, 1);
  localStorage.setItem(`${title}`, JSON.stringify(moviesWatched));

  selectBtn.textContent = `ADD TO ${title.toUpperCase()}`;
}

function checkWatchedStorage(movie) {
  const moviesWatched = JSON.parse(localStorage.getItem(`watched`));
  const selectBtn = modalFilmInfo.querySelector(`button[data-action="watched"]`);

  const movieIndex = moviesWatched.findIndex(item => item.id === movie.id);

  if (movieIndex !== -1) {
    moviesWatched.splice(movieIndex, 1);
    localStorage.setItem(`watched`, JSON.stringify(moviesWatched));

    selectBtn.textContent = 'ADD TO WATCHED';
  }
}

function checkQueueStorage(movie) {
  const moviesQueue = JSON.parse(localStorage.getItem(`queue`));
  const selectBtn = modalFilmInfo.querySelector(`button[data-action="queue"]`);

  const movieIndex = moviesQueue.findIndex(item => item.id === movie.id);

  if (movieIndex !== -1) {
    moviesQueue.splice(movieIndex, 1);
    localStorage.setItem(`queue`, JSON.stringify(moviesQueue));

    selectBtn.textContent = 'ADD TO QUEUE';
  }
}
