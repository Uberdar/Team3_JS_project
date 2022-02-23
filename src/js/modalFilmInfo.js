import MovieApiId from './movieAPI';
const apiById = new MovieApiId();

import movieInfohbs from '../partials/handleBars.hbs/modalFilmInfo.hbs';

const modalFilmInfo = document.querySelector('.backdrop');
const moviesOnGallery = document.querySelector('.gallery');

moviesOnGallery.addEventListener('click', getMovie);
modalFilmInfo.addEventListener('click', addToList);

async function getMovie(e) {
  const card = e.target.closest('.gallery_item');

  if (card) {
    const cardId = card.dataset.id;
    apiById.movieId = cardId;
    const movieById = await apiById.DetailedMovieInfo(cardId);
    sessionStorage.setItem('currentMovie', JSON.stringify(movieById));

    modalFilmInfo.classList.remove('goodby_modal');
    renderModalFilmInfo(movieById);
  }
}

function renderModalFilmInfo(res) {
  // checkLocalStorage(res.id);
  modalFilmInfo.insertAdjacentHTML('beforeend', movieInfohbs(res));

  const element = modalFilmInfo.querySelector('.backdrop_genres');
  const element1 = element.textContent.slice(0, -26);
  console.log(element1.length);
  element.textContent = element1;
}

function checkLocalStorage(id) {
  // const { id } = JSON.parse(sessionStorage.getItem('currentMovie'));

  const checkStorage = JSON.parse(localStorage.getItem(`watched`)) || [];
  const selectBtn = modalFilmInfo.querySelector(`button[data-action="watched"]`);
  console.log(modalFilmInfo);

  if (!checkStorage.includes(id)) {
    selectBtn.textContent = `REMOVE FROM WATCHED`;
    return;
  }
  selectBtn.textContent = `ADD TO WATCHED`;
}

function addToList(e) {
  const checkBtn = e.target.dataset.action;
  const movie = JSON.parse(sessionStorage.getItem('currentMovie'));

  if (checkBtn === 'watched') {
    addRemoveWotchList(movie, checkBtn);
    return;
  }
  if (checkBtn === 'queue') {
    addRemoveWotchList(movie, checkBtn);
    return;
  }
  if (checkBtn === 'closeBackdrop') {
    modalFilmInfo.classList.add('goodby_modal');
    modalFilmInfo.innerHTML = '';
    return;
  }
  if (checkBtn === 'clear') {
    localStorage.clear();
    return;
  }
}
function addRemoveWotchList(movie, title) {
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
