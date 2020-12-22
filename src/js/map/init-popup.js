import { createElement } from '../logic/createElement.js';

export const initPopup = () => {
  const mapArea = document.querySelector('.map');
  const infoWrapper = createElement('div', mapArea, 'country-info__wrapper');
  const folderTotal = 4;
  let className;
  for (let i = 1; i <= folderTotal; i +=1 ) {
    if (i === 1) className = 'country-info__map';
    if (i === 2) className = 'country-info__country';
    if (i === 3) className = 'country-info__count';
    if (i === 4) className = 'country-info__value';
    createElement('p', infoWrapper, className);
  }
}

