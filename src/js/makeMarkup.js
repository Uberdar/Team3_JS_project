import DEMO from './movieAPI';
const ClassInstance = new DEMO(); //создаем екземпляр класса

const gallery = document.querySelector('.gallery');

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
    .map(({ id, title, poster_path, release_date, genre_ids }) => {
      return (cards = `
        <div class='gallery_item' data-id='${id}'>
              <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" loading="lazy" class="movie-card__img"/>
              <div class="movie-card__info">
                <p class="movie-card__info-name">
                  ${title}
                </p>
                <p class="movie-card__info-item">
                  ${genre_ids} | ${release_date}
                </p>
              </div>
        </div>
          `);
    })
    .join('');
}
export default makeMarkup;

// <a class="movie-card" href="${largeImageURL}">

// <p class="info-item">
//   <b>Comments</b>
//   <span>${release_date}</span>
// </p>;

// function addCardsToGallery(markup) {
//   refs.gallery.insertAdjacentHTML('beforeend', markup);
// }
