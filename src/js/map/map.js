import { initMarker } from './init-marker.js';
import { initPopup } from './init-popup.js';
import { updateMapInfo } from './updateMapInfo.js';
import { dataView, modeCount } from '../global/globalVariables.js';
import { updateLegend } from './updateLegend.js'


export let mapInit = (navCount) => {
  let mapIn = false;
  let dataCovidAPI;
  var map;
  const mapboxToken = 'pk.eyJ1IjoiYXJzZW5pLXAiLCJhIjoiY2tpcmJ0bTl5MjQ0ZTJxcWplaHQwbTBucCJ9.hwxgqrrfz1HFJ2wR2sHMSw'
  mapboxgl.accessToken = mapboxToken;
 
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/arseni-p/ckirvn0eu0d5u19qkyps533ks',
    zoom: 2.9,
    center: [15, 53],
  });
  map.addControl(new mapboxgl.NavigationControl());
  initPopup();
  const infoBlock = document.querySelector('.country-info__wrapper');
  const infoMap = document.querySelector('.country-info__map');
  const infoCountry = document.querySelector('.country-info__country');
  const infoCount = document.querySelector('.country-info__count');
  const infoValue = document.querySelector('.country-info__value');

  let countColors = modeCount.colorsInfected;
  const sizeLevel = ['low', 'premedium', 'medium', 'pretop', 'top'];
  const gradation = 100000;

  fetch('https://corona.lmao.ninja/v2/countries')
  .then(response => response.json())
  .then(data => {
    dataCovidAPI = data;
    data.forEach(item => {
      const countryLong = item.countryInfo.long;
      const countryLat = item.countryInfo.lat;
      let countryInfected = item.cases;

      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = initMarker(countryInfected, countColors, navCount);
      el.classList.add(initMarker(countryInfected, sizeLevel, navCount));
      var marker = new mapboxgl.Marker(el).setLngLat([countryLong, countryLat]).addTo(map);
    });
  });

  const key = 'AIzaSyCiiIxgZV1xMYCHzFFyh5h_arRS3YsgvHo';
  const mapWrapper = document.getElementById('map');
  const mapContainer = document.querySelector('.map__wrapper');
  let leftPoint = mapContainer.offsetLeft + mapWrapper.offsetLeft;
  let topPoint = mapContainer.offsetTop + mapWrapper.offsetTop;

  let currNavMode = 0;
  const maxCount = 11;
  const minCount = 0;
  mapContainer.addEventListener('click', (event) => {
    if ( event.target.classList.contains('nav__left') && currNavMode < maxCount ) {currNavMode++};
    if ( event.target.classList.contains('nav__right') && currNavMode > minCount ) {currNavMode--}
  });

  updateLegend(navCount, countColors) ;

  map.on('mousemove', function(e) {
      mapIn = true;
      const lat = e.lngLat.lat;
      const lng = e.lngLat.lng;
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}&language=en`;
      fetch(url)
      .then(response => response.json() )
      .then( data => {
        let parts = data.results[0].address_components;
        let countryItem = parts.filter(item => {
          if (item.types.includes('country')) {
            return item.types.includes('country');
          }
        });

         if (countryItem && countryItem.length > 0 && mapIn) {
          infoCountry.textContent = countryItem[0].long_name;
          dataCovidAPI.find(item => {
            if (item.countryInfo.iso2 === countryItem[0].short_name) {
              infoMap.style.backgroundImage = `url('${item.countryInfo.flag}')`;
              if (currNavMode === modeCount.infected) {infoCount.textContent = item.cases.toLocaleString()};
              if (currNavMode === modeCount.deaths) {infoCount.textContent = item.deaths.toLocaleString()};
              if (currNavMode === modeCount.recovered) {infoCount.textContent = item.recovered.toLocaleString()};
              if (currNavMode === modeCount.todayInfected) {infoCount.textContent = item.todayCases.toLocaleString()};
              if (currNavMode === modeCount.todayDeaths) {infoCount.textContent = item.todayDeaths.toLocaleString()};
              if (currNavMode === modeCount.todayRecovered) {infoCount.textContent = item.todayRecovered.toLocaleString()};
              if (currNavMode === modeCount.gradationInfected) {infoCount.textContent = Math.round(item.cases / (item.population / gradation)).toLocaleString()};
              if (currNavMode === modeCount.gradationDeaths) {infoCount.textContent = Math.round(item.deaths / (item.population / gradation)).toLocaleString()};
              if (currNavMode === modeCount.gradationRecovered) {infoCount.textContent = Math.round(item.recovered / (item.population / gradation)).toLocaleString()};
              if (currNavMode === modeCount.gradationDayInfected) {infoCount.textContent = Math.round(item.todayCases / (item.population / gradation)).toLocaleString()};
              if (currNavMode === modeCount.gradationDayDeaths) {infoCount.textContent = ((item.todayDeaths / (item.population / gradation)).toFixed(2)).toLocaleString()};
              if (currNavMode === modeCount.gradationDayRecovered) {infoCount.textContent = ((item.todayRecovered / (item.population / gradation)).toFixed(2)).toLocaleString()};
            }
           });
           infoValue.textContent = dataView[currNavMode];
           infoBlock.classList.add('country-info__wrapper--on');
         } else {
           infoBlock.classList.remove('country-info__wrapper--on')
         }  
       })
    });

    map.on('mouseout', function() {
      mapIn = false;
      infoBlock.classList.remove('country-info__wrapper--on');
    });

  mapWrapper.addEventListener('mousemove', (event) => {
    let popupPosX = event.pageX - leftPoint - 70;
    let popupPosY = event.pageY - topPoint - 90;
    infoBlock.style.left = `${popupPosX}px`
    infoBlock.style.top = `${popupPosY}px`;
  });
}
