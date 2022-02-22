import DEMO from './movieAPI';
// const ClassInstance = new DEMO(); //создаем екземпляр класса
// async function DEMO_TRANDING_MOVIES(){ //асинхронная функция для работы с промисами
//     const demox = await ClassInstance.TrandingMovies(); //присваиваем промис TrandingMovies() константе
//     console.log('demox: ', demox); // смотрим что получилось

//     const demox_results = demox.results; // делаем выборку из обьекта который получился выше
//     console.log('demox_results: ', demox_results); // смотрим что получилось

//     demox_results.map(x => console.log('Trending_results:',x.original_name, x.title, x.id)); 
//     // так как выше мы получили массив 
//     //обьектов то переираем его с помощью функции .мар() для доступа ко всем свойствам обьекта
//     // (!)некоторые фильмы имеют разные строки для написания названия фильма (original_name/title/original_title)
//     //некоторые могут быть заполнены, а некоторые пустые , нужны проверки.
// };
// DEMO_TRANDING_MOVIES(); // инициируем функцию чтоб все выше описанное выполнилось
// async function DEMO_SEARCH_MOVIES() {
//     console.log('inside DEMO_SEARCH_MOVIES');
//     let Query_Variable = ClassInstance.query = 'pirate';
//     console.log('Query_Variable: ', Query_Variable);
//     const x = await ClassInstance.SearchMovie();
//     console.log('x: ', x.results);
//     const search_results = x.results;
//     search_results.map(x => console.log('search_results: ',x.title) )

//     console.log('end DEMO_SEARCH_MOVIES');
// }
// DEMO_SEARCH_MOVIES();
//476669
// async function DETAILED_INFO_MOVIES(){
//     ClassInstance.movieid = 476669;
//     const demox = await ClassInstance.DetailedMovieInfo();
//     console.log('INFO: ', demox);
// }
// DETAILED_INFO_MOVIES();