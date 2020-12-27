import { navCount } from '../logic/dataNavigation.js';
import { mapInit } from './map.js';


export const mapFullScreen = () => {
  const fullScreenbtn = document.querySelector('.screen__btn');
  const mapForFull = document.querySelector('.map');
  const navList = mapForFull.querySelector('.navigation__list');
  const legendTitle = document.querySelector('.legend__title');
  const legendTitleText = 'Infected';

  fullScreenbtn.addEventListener('click', () => {
    const mapID = document.getElementById('map');
    mapID.remove();
    const newMapID = document.createElement('div');
    newMapID.id = 'map';
    mapForFull.prepend(newMapID);
    const btnRight = mapForFull.querySelector('.nav__right');

    if (!fullScreenbtn.classList.contains('screen__btn--opened')) {
      fullScreenbtn.classList.add('screen__btn--opened');
      mapForFull.classList.add('map__full');
    } else {
      fullScreenbtn.classList.remove('screen__btn--opened');
      mapForFull.classList.remove('map__full');
      fullScreenbtn.classList.add('screen__btn--closed');
      setTimeout(() => {
        fullScreenbtn.classList.remove('screen__btn--closed');
      }, 1000)
    };
    mapInit(navCount);
    navList.style.left = '0';
    btnRight.setAttribute('disabled', 'disabled');
    btnRight.classList.add('disabled-btn');
    legendTitle.textContent = legendTitleText;
  })
};

export default mapFullScreen;