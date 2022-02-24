import DEMO from './movieAPI';
import Pagination from 'tui-pagination'; /* ES6 */
import markup from './makeMarkup';
import {Spinner} from 'spin.js';
const ClassInstance = new DEMO(); //создаем екземпляр класса

document.getElementById("poster").style.display="none";
var debounce = require('debounce'); //npm install debounce

let pagesVar = 1;
async function DEMO_TRANDING_MOVIES() {

  const demox = await ClassInstance.TrandingMovies(); //присваиваем промис TrandingMovies() константе
  console.log('demox: ', demox); // смотрим что получилось
  const demox_results = demox.results; // делаем выборку из обьекта который получился выше
  console.log('demox_results: ', demox_results); // смотрим что получилось

//   demox_results.map(x => console.log('Trending_results:', x.original_name, x.title, x.id));
}
DEMO_TRANDING_MOVIES(); // инициируем функцию чтоб все выше описанное выполнилось

const container = document.getElementById('pagination');

const options = { // below default value of options
     totalItems: 200,
     itemsPerPage: 20,
     visiblePages: 5,
     page: 1,
     centerAlign: false,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
     usageStatistics:false,
     template: {
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
         moveButton:
             '<a href="#" class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</a>',
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 '<span class="tui-ico-ellip">...</span>' +
             '</a>'
     }

};


const pagination = new Pagination(container, options);


// console.log('container: ', container.childNodes);
// let xss = container.childNodes;
// console.log('xss: ', xss);
// xss.forEach(element => console.log(element));

// let takepages = document.querySelector('tui-is-selected');
// let takepagess = document.querySelector('tui-page-btn');
// console.log('takepagess: ', takepagess);
// console.log('takepages: ', takepages);

// after move
// pagination.on("afterMove", (event) => {
//     const { page } = event;
//     /* тут делаешь запрос */
//     // fetch(`https://some-site.com/products?page=${page}`)
//     console.log(page);
//   });

pagination.on("afterMove", async function testfun(event){
    const { page } = event;
    ClassInstance.testpage = page;
    const testvar = await ClassInstance.GetParticularPage();
    console.log('testvar: ', testvar.results);
    console.log(page);
    // console.log(document.querySelector(".gallery"));
    document.querySelector(".gallery").innerHTML = '';
    document.querySelector(".gallery").innerHTML = markup(testvar.results);

}

);



// async function DEMO_SEARCH_MOVIES() {
//   console.log('inside DEMO_SEARCH_MOVIES');
//   let Query_Variable = (ClassInstance.query = 'pirate');
//   console.log('Query_Variable: ', Query_Variable);
//   const x = await ClassInstance.SearchMovie();
//   console.log('x: ', x.results);
//   const search_results = x.results;
//   search_results.map(x => console.log('search_results: ', x.title));

//   console.log('end DEMO_SEARCH_MOVIES');
// }
// DEMO_SEARCH_MOVIES();
// 476669;
// async function DETAILED_INFO_MOVIES() {
//   ClassInstance.movieid = 476669;
//   const demox = await ClassInstance.DetailedMovieInfo();
//   console.log('INFO: ', demox);
// }
// DETAILED_INFO_MOVIES();