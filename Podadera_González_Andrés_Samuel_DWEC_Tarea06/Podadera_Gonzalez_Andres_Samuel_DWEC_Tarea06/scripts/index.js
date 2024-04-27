//-----------------------------------------//
// Consulta a la API de GeoDB Cities para obtener datos geográficos - http://geodb-cities-api.wirefreethought.com/
//-----------------------------------------//

//-----------------------------------------//
// Consulta a la API de VisualCrossing para obtener el tiempo - https://www.visualcrossing.com/
//-----------------------------------------//
const API_KEY = '67GUAUV4UMRXHYN5VKG7VBTLA';
const API_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
let city = document.getElementById('ciudad').value;
const API_QUERY = city + '?key=' + API_KEY;

// Funcion para obtener el tiempo de una ciudad
async function getWeather(city) {
  const response = await fetch(API_URL + city + API_QUERY);
  const data = await response.json();
  return data;
}

// Funcion para mostrar el tiempo en la pagina
function showWeather(city, weather) {
  const weatherDiv = document.getElementById('tarjeta_tiempo');
  weatherDiv.innerHTML = '';
  const cityDiv = document.createElement('div');
  cityDiv.innerHTML = '<h2>' + city + '</h2>';
  weatherDiv.appendChild(cityDiv);
  const weatherTable = document.createElement('table');
  weatherTable.innerHTML = `
      <tr>
        <th>Estado</th>
        <th>Temperatura</th>
      </tr>
      <tr>
        <td>${weather.currentConditions.icon}</td>
        <td>${weather.currentConditions.temp}</td>
      </tr>
    `;
  weatherDiv.appendChild(weatherTable);
}

// Funcion para obtener y mostrar el tiempo de una ciudad
async function showCityWeather(city) {
  const weather = await getWeather(city);
  showWeather(city, weather);
}

// Evento para mostrar el tiempo de una ciudad
document.getElementById('buscar').addEventListener('click', () => {
  const city = document.getElementById('ciudad').value;
  showCityWeather(city);
});

// Funcion para obtener el tiempo de los proximos 10 dias de una ciudad
async function getWeather10(city) {
  const response = await fetch(API_URL + city + API_QUERY + '&days=10');
  const data = await response.json();
  return data.days;
}

// Funcion para mostrar el tiempo de los proximos 10 dias de una ciudad
async function showCityWeather10(city) {
  const weather = await getWeather10(city);
  const weatherDiv = document.getElementById('prevision_tiempo');
  weatherDiv.innerHTML += '<br>';
  const cityDiv = document.createElement('div');
  cityDiv.innerHTML = '<h2>' + city + '</h2>';
  weatherDiv.appendChild(cityDiv);
  weather.forEach((day, index) => {
    if (index > 0 && index < 11) {
      const weatherTable = document.createElement('table');
      weatherTable.innerHTML = `
      <tr>
        <th>Estado</th>
        <th>Temperatura</th>
      </tr>
      <tr>
        <td>${day.conditions}</td>
        <td>${day.datetime}</td>
      </tr>
    `;
      weatherDiv.appendChild(weatherTable);
    }
  });
}

// Evento para mostrar el tiempo de los proximos 10 dias de una ciudad
document.getElementById('prevision').addEventListener('click', () => {
  const city = document.getElementById('ciudad').value;
  showCityWeather10(city);
});

//-----------------------------------------//
// Mapa con la libreria Leaflet
//-----------------------------------------//
// Creacion del objeto mapa
let map = new L.Map('map').setView([36.716666666, -4.416666666], 15);
// Creacion de la capa de OpenStreetMap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 13,
}).addTo(map);
