export const mapInit = () => {
  const mapboxToken = 'pk.eyJ1IjoiYXJzZW5pLXAiLCJhIjoiY2tpcmJ0bTl5MjQ0ZTJxcWplaHQwbTBucCJ9.hwxgqrrfz1HFJ2wR2sHMSw'

  mapboxgl.accessToken = mapboxToken;
  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 2,
  center: [27.56, 53.91],
  
  });

  const getColor = (count) => {
    const topCount = 1000000;
    const preTopCount = 500000;
    const mediumCount = 100000;
    const preMediumCount = 50000;
    // const countColors = ['#9B0000', '#C60000', '#ff0000', '#FF3939', '#FF6464'];
    const topColor = 'rgba(155, 0, 0, 0.7)';
    const preTopColor = 'rgba(198, 0, 0, 0.7)';
    const mediumColor = 'rgba(255, 0, 0, 0.7)';
    const preMediumColor = 'rgba(155, 57, 57, 0.7)';
    const lowColor = 'rgba(155, 100, 100, 0.7)';
    
    if (count > topCount) { return topColor };
    if (count > preTopCount && count < topCount) { return preTopColor };
    if (count > mediumCount && count < preTopCount) { return mediumColor };
    if (count > preMediumCount && count < mediumCount) { return preMediumColor };
    if (count < preMediumCount) { return lowColor }
  };

  fetch('https://corona.lmao.ninja/v2/countries')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const countryId = item.countryInfo._id;
      const countryLong = item.countryInfo.long;
      const countryLat = item.countryInfo.lat;
      const countryInfected = item.cases;
      console.log(countryId, countryInfected);
      
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = getColor(countryInfected);
      const marker = new mapboxgl.Marker(el).setLngLat([countryLong, countryLat]).addTo(map);
      
    })
  });
};

export default mapInit;
