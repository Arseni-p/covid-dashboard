import { tableGlobalCases } from './js/views/tableGlobalCases.js';
import GraphInit from './js/graphics/app';
import { mapInit } from './js/map.js';


tableGlobalCases.init();
GraphInit();

console.log('webpack!');

//https://api.openweathermap.org/data/2.5/weather?q=city&lang=en&appid=dd286db0aa32ac081394420a041263de&units=metric


document.addEventListener('DOMContentLoaded', () => {
  mapInit();
});
