import { tableGlobalCases } from './js/views/tableGlobalCases.js';

import GraphInit from './js/graphics/app.js';
import { mapInit } from './js/map/map.js';
import { mapWrapper } from './js/global/globalVariables.js';
import { navCount, dataNavigation } from './js/logic/dataNavigation.js';
import { updateMapInfo } from './js/map/updateMapInfo.js';
import { legendPopup } from './js/map/legendPopup.js';
import { mapFullScreen } from './js/map/mapFullScreen.js';
import Search from './js/search/search.js';
import { keyboard } from './js/keyboard/keyboard.js';
import { mainTableTwelveIndex } from './js/views/mainTableTwelveIndex.js';

tableGlobalCases.init();
mainTableTwelveIndex.init();
GraphInit();
Search();

document.addEventListener('DOMContentLoaded', () => {
  mapInit(navCount);
  legendPopup();
  mapFullScreen();
  keyboard();
});

mapWrapper.addEventListener('click', (event) => {
	if (event.target.classList.contains('navigation__button')) {
		dataNavigation(mapWrapper, event);
		updateMapInfo(navCount);
	}
});
