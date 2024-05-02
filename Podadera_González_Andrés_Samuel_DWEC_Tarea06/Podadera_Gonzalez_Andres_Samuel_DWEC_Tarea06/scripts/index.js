//-----------------------------------------//
// Consulta a la API de GeoDB Cities para obtener datos geográficos - http://geodb-cities-api.wirefreethought.com/
//-----------------------------------------//
let city = '';
let countryCode = '';
let country = '';
let population = '';
let region = '';
let placeType = '';

const API_KEY = '67GUAUV4UMRXHYN5VKG7VBTLA';
const API_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const GEODB_API_URL = `http://geodb-free-service.wirefreethought.com/v1/geo/places`;

// Funcion para cargar los datos de la ciudad, pais
function setCityCountry() {
  let dataInput = document.getElementById('ciudad').value;
  city = dataInput.split(',')[0];
  if (dataInput.split(',')[1] == undefined) {
    countryCode = 'ES';
  } else {
    countryCode = dataInput.split(',')[1].toUpperCase();
  }
}

//-----------------------------------------//
// Consulta a la API de VisualCrossing para obtener el tiempo - https://www.visualcrossing.com/
//-----------------------------------------//

// Funcion para obtener el tiempo de una ciudad
async function getWeather(city) {
  const response = await fetch(
    `${API_URL}${city},${countryCode}?lang=es&key=${API_KEY}`
  );
  const data = await response.json();
  return data.days;
}

// Funcion para mostrar el tiempo en la pagina
async function showWeather(weather) {
  await getInfoLocalization();
  const divPopulation = document.getElementById('poblacion');
  const divCountry = document.getElementById('pais');
  const divRegion = document.getElementById('region');
  const divCardWeather = document.getElementById('tarjetaTiempo');
  divRegion.innerHTML = region;
  divPopulation.innerHTML = population;
  divCountry.innerHTML = country;
  divCardWeather.innerHTML = '';
  const divWeatherActual = document.createElement('div');
  // Elijo mostrar el tiempo actual de la primera hora del dia
  weather = weather[0];
  divWeatherActual.innerHTML = `
    <h2 id="titulo">${city}</h2>
    <p id="temperatura">Temperatura Max/Min: ${(
      ((weather.tempmax - 32) * 5) /
      9
    ).toFixed(1)} ºC / ${(((weather.tempmin - 32) * 5) / 9).toFixed(1)} ºC</p>
    <img id="imagen" src="./icons/${weather.icon}.svg" alt="icono tiempo">
    <p id="descripcion">${weather.conditions}</p>
    <p id="precipitacion">${
      weather.precip != 0
        ? `Llueve. Tipo de lluvia: ${weather.preciptype}`
        : 'No llueve'
    }</p>
    <p id="visibilidad">Visibilidad: ${weather.visibility}</p>
    ${
      weather.windspeed != 0
        ? `<p id="viento"><span>Viento:<span> Velocidad => ${weather.windspeed} / Dirección => ${weather.winddir}</p>`
        : ''
    }
    <p id="indiceUltraviloleta">Índice Ultravioleta: ${weather.uvindex}</p>
  `;

  divCardWeather.appendChild(divWeatherActual);
}

// Funcion para obtener y mostrar el tiempo de una ciudad
async function showCityWeather(city) {
  const weather = await getWeather(city);
  showWeather(weather);
}

// Evento para mostrar el tiempo de una ciudad
document
  .getElementById('botonPrevisionDiaActual')
  .addEventListener('click', () => {
    document.getElementById('prevision10Dias').innerHTML = '';
    document.getElementById('localizacion').innerHTML = '';
    setCityCountry();
    showCityWeather(city);
  });

// Funcion para obtener el tiempo de los proximos 10 dias de una ciudad
async function getWeather10(city) {
  const response = await fetch(
    `${API_URL}${city},${countryCode}?lang=es&key=${API_KEY}`
  );
  const data = await response.json();
  return data.days;
}

// Funcion para mostrar el tiempo de los proximos 10 dias de una ciudad
async function showCityWeather10(city) {
  const weather = await getWeather10(city);
  const weatherDiv = document.getElementById('prevision10Dias');
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
document
  .getElementById('botonPrevision10Dias')
  .addEventListener('click', () => {
    document.getElementById('tarjetaTiempo').innerHTML = '';
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
document.getElementById('botonLocalizacion').addEventListener('click', () => {
  document.getElementById('prevision10Dias').innerHTML = '';
  document.getElementById('tarjetaTiempo').innerHTML = '';
  const localizationDiv = document.getElementById('localizacion');
  setCityCountry();
  getInfoLocalization().then(() => {
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
async function getInfoLocalization() {
  const response = await fetch(
    `${GEODB_API_URL}?namePrefix=${city}&languageCode=${countryCode}`
  );
  const data = await response.json();
  if (data.data.length > 0) {
    for (let localization of data.data) {
      if (localization.countryCode === countryCode) {
        latitud = localization.latitude;
        longitud = localization.longitude;
        population = localization.population;
        region = localization.region;
        placeType = localization.placeType;
        country = localization.country;
        city = localization.name;
        break;
      }
    }
  } else {
    latitud = undefined;
    longitud = undefined;
    population = undefined;
    region = undefined;
    placeType = undefined;
  }
}
