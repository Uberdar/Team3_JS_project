import DEMO from './movieAPI';
import { saveOnLocalStorag, getOnLocalStorage } from './local_storag';
const ClassInstance = new DEMO(); //создаем екземпляр класса

const gallery = document.querySelector('.gallery');

const LOCALSTORAGE_KEY = 'genres-kod';

const genresArr = getOnLocalStorage(LOCALSTORAGE_KEY) || [];
console.log(genresArr);
if (genresArr.length === 0) {
  DEMO_GET_GENRES();
}

async function DEMO_GET_GENRES() {
  const demoxGenres = await ClassInstance.GetGenres();
  const demoxGenres_genres = demoxGenres.genres;
  saveOnLocalStorag(LOCALSTORAGE_KEY, demoxGenres_genres);
  console.log(demoxGenres_genres);
  return genresArr.push(...demoxGenres_genres);
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
        const positiveGenres = genresArr.filter(itemArr => {
          return genre_ids.includes(itemArr.id);
        });
        const finalGanresString = positiveGenres.reduce((positiveGenres, item) => {
          return positiveGenres + ' ' + item.name;
        }, '');
        const finalRating = vote_average.toString().padEnd(3, '.0');
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
                  <p class="movie-card__info-item">${finalGanresString} | ${
          date.getFullYear() || ''
        }
                  </p>
                </div>
                <div class="card__rating">
                  <p class="card__text card__rating--text">${finalRating}</p>
                </div>
              </div>
            </li>
          `);
      },
    )
    .join('');
}
export default makeMarkup;
