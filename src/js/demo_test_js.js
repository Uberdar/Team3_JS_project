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


