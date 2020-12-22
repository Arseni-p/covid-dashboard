import { tableGlobalCases } from './js/views/tableGlobalCases.js';
import GraphInit from './js/graphics/app';
import { mapInit } from './js/map/map.js';
import { mapWrapper } from './js/global/globalVariables.js';
import { navCount, dataNavigation } from './js/logic/dataNavigation.js';
import { updateMapInfo } from './js/map/updateMapInfo.js';
import { legendPopup } from './js/map/legendPopup.js';
import { mapFullScreen } from './js/map/mapFullScreen.js';


tableGlobalCases.init();
GraphInit();

document.addEventListener('DOMContentLoaded', () => {
  mapInit(navCount);
  legendPopup();
  mapFullScreen();
});

mapWrapper.addEventListener('click', (event) => {
  if ( event.target.classList.contains('navigation__button') ) {
    dataNavigation(mapWrapper, event);
    updateMapInfo(navCount);  
  }
});
