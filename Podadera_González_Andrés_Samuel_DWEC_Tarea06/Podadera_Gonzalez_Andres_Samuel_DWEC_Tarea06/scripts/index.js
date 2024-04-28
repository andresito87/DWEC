//-----------------------------------------//
// Consulta a la API de GeoDB Cities para obtener datos geográficos - http://geodb-cities-api.wirefreethought.com/
//-----------------------------------------//
let city = '';
let country = '';

const API_KEY = '67GUAUV4UMRXHYN5VKG7VBTLA';
const API_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const GEODB_API_URL = `http://geodb-free-service.wirefreethought.com/v1/geo/places`;

// Funcion para cargar los datos de la ciudad, pais
function setCityCountry() {
  let dataInput = document.getElementById('ciudad').value;
  city = dataInput.split(',')[0];
  if (dataInput.split(',')[1] == undefined) {
    country = 'ES';
  } else {
    country = dataInput.split(',')[1].toUpperCase();
  }
}

//-----------------------------------------//
// Consulta a la API de VisualCrossing para obtener el tiempo - https://www.visualcrossing.com/
//-----------------------------------------//

// Funcion para obtener el tiempo de una ciudad
async function getWeather(city) {
  const response = await fetch(
    `${API_URL}${city},${country}?lang=es&key=${API_KEY}`
  );
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
        <td>${weather.currentConditions.conditions}</td>
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
  document.getElementById('prevision_tiempo').innerHTML = '';
  document.getElementById('localizacion').innerHTML = '';
  setCityCountry();
  showCityWeather(city);
});

// Funcion para obtener el tiempo de los proximos 10 dias de una ciudad
async function getWeather10(city) {
  const response = await fetch(
    `${API_URL}${city},${country}?lang=es&key=${API_KEY}`
  );
  const data = await response.json();
  return data.days;
}

// Funcion para mostrar el tiempo de los proximos 10 dias de una ciudad
async function showCityWeather10(city) {
  const weather = await getWeather10(city);
  const weatherDiv = document.getElementById('prevision_tiempo');
  weatherDiv.innerHTML = '';
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
  document.getElementById('tarjeta_tiempo').innerHTML = '';
  document.getElementById('localizacion').innerHTML = '';
  setCityCountry();
  showCityWeather10(city);
});

//-----------------------------------------//
// Mapa con la libreria Leaflet
//-----------------------------------------//
// Creacion del objeto mapa
let map = '';
let latitud = '';
let longitud = '';
document.getElementById('boton_localizacion').addEventListener('click', () => {
  document.getElementById('prevision_tiempo').innerHTML = '';
  document.getElementById('tarjeta_tiempo').innerHTML = '';
  const localizationDiv = document.getElementById('localizacion');
  setCityCountry();
  getLatLong().then(() => {
    if (latitud === undefined || longitud === undefined) {
      document.getElementById('localizacion').innerHTML = '';
      localizationDiv.innerHTML = '<h2>Localización no encontrada</h2>';
      return;
    }
    if (map != '') {
      document.getElementById('localizacion').innerHTML = '';
      map.remove();
    }
    const divMap = document.createElement('div');
    divMap.id = 'map';
    localizationDiv.appendChild(divMap);
    document.getElementById('map').innerHTML = '';
    map = new L.Map('map').setView([latitud, longitud], 15);
    // Creacion de la capa de OpenStreetMap
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 13,
    }).addTo(map);
  });
});

// Funcion para obtener la latitud y longitud de una ciudad
async function getLatLong() {
  const response = await fetch(
    `${GEODB_API_URL}?namePrefix=${city}&languageCode=${country}`
  );
  const data = await response.json();
  if (data.data.length > 0) {
    for (let localization of data.data) {
      if (localization.countryCode === country) {
        latitud = localization.latitude;
        longitud = localization.longitude;
        break;
      }
    }
  } else {
    latitud = undefined;
    longitud = undefined;
  }
}
