import { initMarker } from './init-marker.js';
import { dataView, modeCount } from '../global/globalVariables.js';
import { updateLegend } from './updateLegend.js'

function deleteSize(markerSize) {
  if (markerSize.classList.contains('low')) {markerSize.classList.remove('low')};
  if (markerSize.classList.contains('premedium')) {markerSize.classList.remove('premedium')};
  if (markerSize.classList.contains('medium')) {markerSize.classList.remove('medium')};
  if (markerSize.classList.contains('pretop')) {markerSize.classList.remove('pretop')};
  if (markerSize.classList.contains('top')) {markerSize.classList.remove('top')};
}

export const updateMapInfo = (navCount) => {
  const legendTitle = document.querySelector('.legend__title');
  const markers = document.querySelectorAll('.marker');
  let countColors;
  const sizeLevel = ['low', 'premedium', 'medium', 'pretop', 'top'];
  const gradation = 100000;
    if (navCount === modeCount.infected || navCount === modeCount.todayInfected || navCount === modeCount.gradationInfected || navCount === modeCount.gradationDayInfected) {
    countColors = modeCount.colorsInfected;
  };
  if (navCount === modeCount.deaths || navCount === modeCount.todayDeaths || navCount === modeCount.gradationDeaths || navCount === modeCount.gradationDayDeaths) {
    countColors = modeCount.colorsDeaths;
  };
  if (navCount === modeCount.recovered || navCount === modeCount.todayRecovered || navCount === modeCount.gradationRecovered || navCount === modeCount.gradationDayRecovered) {
    countColors = modeCount.colorsRecovery;
  };

  updateLegend(navCount, countColors);

  fetch('https://corona.lmao.ninja/v2/countries')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const index = data.indexOf(item);
      deleteSize(markers[index]);
      let countryInfected;
      if (navCount === modeCount.infected) {countryInfected = item.cases};
      if (navCount === modeCount.deaths) {countryInfected = item.deaths};
      if (navCount === modeCount.recovered) {countryInfected = item.recovered};
      if (navCount === modeCount.todayInfected) {countryInfected = item.todayCases};
      if (navCount === modeCount.todayDeaths) {countryInfected = item.todayDeaths};
      if (navCount === modeCount.todayRecovered) {countryInfected = item.todayRecovered};
      if (navCount === modeCount.gradationInfected) {countryInfected = Math.round(item.cases / (item.population / gradation))};
      if (navCount === modeCount.gradationDeaths) {countryInfected = Math.round(item.deaths / (item.population / gradation))};
      if (navCount === modeCount.gradationRecovered) {countryInfected = Math.round(item.recovered / (item.population / gradation))};
      if (navCount === modeCount.gradationDayInfected) {countryInfected = Math.round(item.todayCases / (item.population / gradation))};
      if (navCount === modeCount.gradationDayDeaths) {countryInfected = (item.todayDeaths / (item.population / gradation)).toFixed(2)};
      if (navCount === modeCount.gradationDayRecovered) {countryInfected = (item.todayRecovered / (item.population / gradation)).toFixed(2)};

      markers[index].style.backgroundColor = initMarker(countryInfected, countColors, navCount);
      markers[index].classList.add(initMarker(countryInfected, sizeLevel, navCount));
      legendTitle.textContent = dataView[navCount];
    });
  });
};

export default updateMapInfo;