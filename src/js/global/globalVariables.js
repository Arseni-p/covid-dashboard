/* eslint-disable prefer-const */
export const mapWrapper = document.querySelector('.map__wrapper');
export const legendImg = document.querySelectorAll('.legend__img');
export const legendItems = document.querySelectorAll('.legend__gradation');
export const dataView = ['infected', 'deaths', 'recovered', 'infected p/d', 'deaths p/d', 'recovered p/d', 'infected per 100k', 'deaths per 100k', 'recovered per 100k', 'infected p/d p/100k', 'deaths p/d p/100k', 'recovered p/d p/100k'];
export const modeCount = {
  'infected': 0,
  'deaths': 1,
  'recovered': 2,
  'todayInfected': 3,
  'todayDeaths': 4,
  'todayRecovered': 5,
  'gradationInfected': 6,
  'gradationDeaths': 7,
  'gradationRecovered': 8,
  'gradationDayInfected': 9,
  'gradationDayDeaths': 10,
  'gradationDayRecovered': 11,
  'colorsInfected': ['rgba(155, 100, 100, 0.7)', 'rgba(155, 57, 57, 0.7)', 'rgba(255, 0, 0, 0.7)', 'rgba(198, 0, 0, 0.7)', 'rgba(155, 0, 0, 0.7)'],
  'colorsDeaths': ['rgba(255, 228, 100, 0.7)', 'rgba(255, 220, 57, 0.7)', 'rgba(255, 210, 0, 0.7)', 'rgba(198, 163, 0, 0.7)', 'rgba(155, 128, 0, 0.7)'],
  'colorsRecovery': ['rgba(134, 201, 138, 0.7)', 'rgba(84, 167, 89, 0.7)', 'rgba(45, 134, 55, 0.7)', 'rgba(17, 100, 22, 0.7)', 'rgba(0, 67, 4, 0.7)'],
};
export const legendValues = [
  [1000000, 500000, 100000, 50000],
  [100000, 50000, 10000, 1000],
  [1000000, 500000, 100000, 1000],
  [5000, 1000, 100, 50],
  [1000, 500, 100, 50],
  [10000, 5000, 1000, 50],
  [10000, 5000, 1000, 100],
  [100, 75, 50, 25],
  [5000, 2500, 1000, 100],
  [70, 50, 30, 10],
  [1, 0.7, 0.4, 0.1],
  [70, 50, 30, 10]  
];

// eslint-disable-next-line import/no-mutable-exports
export let posX = 0;
