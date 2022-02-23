import DEMO from './movieAPI';
const ClassInstance = new DEMO(); //создаем екземпляр класса

const gallery = document.querySelector('.gallery');

// const LOCALSTORAGE_KEY = 'genres-kod';
// const load = () => {
//   try {
//     const serializedState = localStorage.getItem(LOCALSTORAGE_KEY);
//     return (serializedState = JSON.parse(serializedState));
//   } catch (error) {
//     DEMO_GET_GENRES();
//   }
// };

const genresArr = [];

async function DEMO_GET_GENRES() {
  const demoxGenres = await ClassInstance.GetGenres();
  const demoxGenres_genres = demoxGenres.genres;
  console.log(demoxGenres_genres);
  return genresArr.push(...demoxGenres_genres);
}
DEMO_GET_GENRES();

console.log(genresArr);

function getStringGenres(genresArr, genre_ids) {
  genresArr.forEach(element => {
    if (genre_ids !== element.id) return;
    stringGenres = element.name;
  });
}

async function DEMO_TRANDING_MOVIES() {
  //асинхронная функция для работы с промисами
  const demox = await ClassInstance.TrandingMovies(); //присваиваем промис TrandingMovies() константе
  // console.log('demox: ', demox); // смотрим что получилось

  const demox_results = demox.results; // делаем выборку из обьекта который получился выше
  // console.log('demox_results: ', demox_results); // смотрим что получилось

  // demox_results.map(x => console.log('Trending_results:', x.original_name, x.title, x.id));

  gallery.innerHTML = makeMarkup(demox_results);

  // makeMarkup({ title, poster_path, release_date, genre_ids });
  // так как выше мы получили массив
  //обьектов то переираем его с помощью функции .мар() для доступа ко всем свойствам обьекта
  // (!)некоторые фильмы имеют разные строки для написания названия фильма (original_name/title/original_title)
  //некоторые могут быть заполнены, а некоторые пустые , нужны проверки.
}
DEMO_TRANDING_MOVIES();

function makeMarkup(cards) {
  return cards
    .map(
      ({
        title,
        original_title,
        name,
        original_name,
        poster_path,
        release_date,
        genre_ids,
        vote_average,
      }) => {
        const date = new Date(release_date);
        return (cards = `
            <li class="movie-card gallery_item">
              <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${
          title || original_title || name || original_name
        }" loading="lazy" class="movie-card__img"/>
              <div class="movie-card__info">
                <div class="movi-card">
                  <p class="movie-card__info-name">${
                    title || original_title || name || original_name
                  }
                  </p>
                  <p class="movie-card__info-item">${genre_ids} | ${date.getFullYear() || ''}
                  </p>
                </div>
                <div class="card__rating">
                  <p class="card__text card__rating--text">${vote_average}</p>
                </div>
              </div>
            </li>
          `);
      },
    )
    .join('');
}
export default makeMarkup;
