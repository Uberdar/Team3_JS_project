// import DEMO from './movieAPI';
// const ClassInstance = new DEMO(); //создаем екземпляр класса
// async function DEMO_TRANDING_MOVIES() {
//   //асинхронная функция для работы с промисами
//   const demox = await ClassInstance.TrandingMovies(); //присваиваем промис TrandingMovies() константе
//   console.log('demox: ', demox); // смотрим что получилось

//   const demox_results = demox.results; // делаем выборку из обьекта который получился выше
//   console.log('demox_results: ', demox_results); // смотрим что получилось

//   demox_results.map(x => console.log('Trending_results:', x.original_name, x.title, x.id));
//   // так как выше мы получили массив
//   //обьектов то переираем его с помощью функции .мар() для доступа ко всем свойствам обьекта
//   // (!)некоторые фильмы имеют разные строки для написания названия фильма (original_name/title/original_title)
//   //некоторые могут быть заполнены, а некоторые пустые , нужны проверки.
// }
// DEMO_TRANDING_MOVIES(); // инициируем функцию чтоб все выше описанное выполнилось
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

import DEMO from './movieAPI';
import Pagination from 'tui-pagination'; 
import markup from './makeMarkup';
import {Spinner} from 'spin.js';
var debounce = require('debounce'); 
const ClassInstance = new DEMO(); 


async function DEMO_TRANDING_MOVIES() {

  const demox = await ClassInstance.TrandingMovies(); 

  const container = document.getElementById('pagination');
  const options = { 
       totalItems: demox.total_results,
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
  var target = document.getElementById('testspinner');
  var opts = {
    lines: 13, // The number of lines to draw
    length: 80, // The length of each line
    width: 22, // The line thickness
    radius: 70, // The radius of the inner circle
    scale: 1.45, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 0.8, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-shrink', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: 'black', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    top: '325%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute', // Element positioning
  };
  var spinner = new Spinner(opts).stop(target);

async function testfun(event){
    const { page } = event;
    ClassInstance.testpage = page;
    const testvar = await ClassInstance.GetParticularPage();
    document.querySelector(".gallery").innerHTML = '';
    document.querySelector(".gallery").innerHTML = markup(testvar.results);
    spinner.stop(target);

}
const x = debounce((event)=>{return testfun(event)}, 1500);
  pagination.on("afterMove", (event) => {
        spinner.spin(target);
        x(event);
      });

}
DEMO_TRANDING_MOVIES(); 


//------------------//


const DEBOUNCE_DELAY = 300;
const inputBox = document.querySelector(".search-form__input");
inputBox.addEventListener('input', debounce(start, DEBOUNCE_DELAY));
const refSearchWindow = document.querySelector('.movie-list');

async function start(data = []){
    let searchData = data.target.value.trim();
    console.log('searchData: ', searchData);
    if (!searchData){
        return Update();
    }
    ClassInstance.query = searchData;
    const x = await ClassInstance.SearchMovie();
    console.log('x: ', x);
    let xx = x.results;

    // const markVar = writeMarkUp(xx);
    // Update(markVar);
    document.querySelector(".gallery").innerHTML = '';
    document.querySelector(".gallery").innerHTML = markup(xx);





    const container = document.getElementById('pagination');
    var target = document.getElementById('testspinner');
    var opts = {
      lines: 13, // The number of lines to draw
      length: 80, // The length of each line
      width: 22, // The line thickness
      radius: 70, // The radius of the inner circle
      scale: 1.45, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      speed: 0.8, // Rounds per second
      rotate: 0, // The rotation offset
      animation: 'spinner-line-shrink', // The CSS animation name for the lines
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: 'black', // CSS color or array of colors
      fadeColor: 'transparent', // CSS color or array of colors
      top: '325%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: '0 0 1px transparent', // Box-shadow for the lines
      zIndex: 2000000000, // The z-index (defaults to 2e9)
      className: 'spinner', // The CSS class to assign to the spinner
      position: 'absolute', // Element positioning
    };
    var spinner = new Spinner(opts).stop(target);

    const options = { 
         totalItems: x.total_results,
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
    async function testfun(event){
        const { page } = event;
        ClassInstance.testpage = page;
        const testvar = await ClassInstance.GetParticularPage();
        document.querySelector(".gallery").innerHTML = '';
        document.querySelector(".gallery").innerHTML = markup(testvar.results);
        spinner.stop(target);
    
    }
    const a = debounce((event)=>{return testfun(event)}, 1500);
      pagination.on("afterMove", (event) => {
            spinner.spin(target);
            a(event);
          });
    
};


function Update(item = ''){
    refSearchWindow.innerHTML = item;
}