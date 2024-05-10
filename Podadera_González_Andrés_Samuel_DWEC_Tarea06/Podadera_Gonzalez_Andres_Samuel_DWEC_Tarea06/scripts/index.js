//-----------------------------------------//
// Consulta a la API de GeoDB Cities para obtener datos geográficos - http://geodb-cities-api.wirefreethought.com/
//-----------------------------------------//
let city = '';
let countryCode = '';
let country = '';
let population = '';
let region = '';
let placeType = '';
let latitude = '';
let longitude = '';
let localizationFound = false;
let map = '';

const API_KEY = '67GUAUV4UMRXHYN5VKG7VBTLA';
const VISUAL_CROSSING_API_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const GEODB_API_URL = `http://geodb-free-service.wirefreethought.com/v1/geo/places`;

// Cuando se carga la pagina, se muestra el tiempo de Madrid
document.addEventListener('DOMContentLoaded', () => {
  // Oculto los títulos de la información de la ciudad y la imagen de cargando
  document.getElementById('infoLugar').setAttribute('style', 'display: none');
  document
    .getElementById('localizacion')
    .setAttribute('style', 'display: none');
  document
    .getElementById('tarjetaTiempo')
    .setAttribute('style', 'display: none');
  document.getElementById('cargando').setAttribute('style', 'display: none');

  // Añado evento click en el boton de tiempo actual
  document
    .getElementById('botonPrevisionDiaActual')
    .addEventListener('click', async () => {
      // Oculto la informacion de la ciudad, la prevision del tiempo y el mapa
      document
        .getElementById('tiempoActual')
        .setAttribute('style', 'display: none');
      // Oculto la zona de la previsión de los próximos 10 días
      document
        .getElementById('prevision10Dias')
        .setAttribute('style', 'display: none');
      // Muestro la imagen de cargando
      document
        .getElementById('cargando')
        .setAttribute('style', 'display: block');
      // obtener la ciudad
      getCity();
      // obtener la informacion de la ciudad
      await getInfoLocalization(city);
      // obtener y mostrar el tiempo
      await getWeather();
      // mostrar el mapa con la localizacion de la ciudad(latitude y longitude)
      showMap(latitude, longitude);
    });

  // Añado evento click en el boton de tiempo para los proximos 10 dias
  document
    .getElementById('botonPrevisionProximos10Dias')
    .addEventListener('click', async () => {
      // Muestro la imagen de cargando
      document
        .getElementById('cargando')
        .setAttribute('style', 'display: block');
      // Oculto la informacion de la ciudad, la prevision del tiempo y el mapa
      document
        .getElementById('tiempoActual')
        .setAttribute('style', 'display: none');
      // Oculto la previsión del tiempo de los próximos 10 días
      document
        .getElementById('prevision10Dias')
        .setAttribute('style', 'display: none');
      // obtener la ciudad
      getCity();
      // obtener la informacion de la ciudad
      await getInfoLocalization(city);
      // obtener y mostrar el tiempo para los proximos 10 dias
      await getWeatherNext10Days();
    });
});

// Funcion para obtener la ciudad apartir de los datos introducidos por el usuario
function getCity() {
  city = document.getElementById('ciudad').value.trim().split(',')[0];
  countryCode = document.getElementById('ciudad').value.trim().split(',')[1];
  if (city === '') {
    alert('Introduce una ciudad');
    city = undefined;
  } else if (countryCode === '') {
    countryCode = undefined;
    country = undefined;
  }
  if (city.length < 4) {
    alert('No hay información suficiente para buscar la ciudad');
    city = undefined;
    countryCode = undefined;
  }
  countryCode =
    countryCode != undefined
      ? countryCode.trim().toLocaleUpperCase()
      : undefined;
}

// Funcion para obtener el codigo de pais, tipo de lugar, region, poblacion y pais atraves de la API de GeoDB
async function getInfoLocalization(city) {
  const response = await fetch(
    `${GEODB_API_URL}?namePrefix=${city}&languageCode=es`
  );

  const data = await response.json();
  if (data.metadata.totalCount > 0) {
    if (response.status === 200) {
      for (let localization of data.data) {
        if (
          countryCode != undefined &&
          localization.countryCode === countryCode
        ) {
          placeType = localization.placeType;
          region = localization.region;
          population = localization.population;
          country = localization.country;
          latitude = localization.latitude;
          longitude = localization.longitude;
          localizationFound = true;
          break;
        } else if (localization.countryCode === 'ES') {
          countryCode = localization.countryCode;
          placeType = localization.placeType;
          region = localization.region;
          population = localization.population;
          country = localization.country;
          localizationFound = true;
          break;
        } else {
          placeType = localization.placeType;
          region = localization.region;
          population = localization.population;
          country = localization.country;
          localizationFound = false;
        }
      }
    }
  } else {
    localizationFound = false;
    countryCode = undefined;
    country = undefined;
    region = undefined;
    population = undefined;
    placeType = undefined;
  }
  if (countryCode === undefined) {
    countryCode = 'ES';
    localizationFound = false;
    country = undefined;
    region = undefined;
    population = undefined;
  }
}

// Funcion para obtener y mostrar la prevision del tiempo actual
async function getWeather() {
  // Oculto la tarjeta del tiempo
  document
    .getElementById('tarjetaTiempo')
    .setAttribute('style', 'display: none');

  // Consulto la API de Visual Crossing
  const response = await fetch(
    `${VISUAL_CROSSING_API_URL}${city}${
      countryCode != '' ? `,${countryCode}` : ''
    }/today?unitGroup=metric&lang=es&key=${API_KEY}`
  );

  // Si la respuesta es correcta
  if (response.status === 200) {
    const data = await response.json();

    // Guardo la longitud y latitud de la ciudad
    latitude = data.latitude;
    longitude = data.longitude;

    // Oculto la imagen de cargando
    document.getElementById('cargando').setAttribute('style', 'display: none');
    // Muestro el div contenedor de la información a mostrar
    document
      .getElementById('tiempoActual')
      .setAttribute('style', 'display: block');

    // Muestro la tarjeta del tiempo
    document
      .getElementById('tarjetaTiempo')
      .setAttribute('style', 'display: block');

    // Muestro la informacion de la ciudad
    if (!localizationFound) {
      document.getElementById('divPais').setAttribute('style', 'display: none');
      document
        .getElementById('divRegion')
        .setAttribute('style', 'display: none');
      document
        .getElementById('divPoblacion')
        .setAttribute('style', 'display: none');
      document
        .getElementById('noEncontrada')
        .setAttribute('style', 'display: block');
      document.getElementById(
        'noEncontrada'
      ).innerHTML = `<p class="error">No se ha encontrado la ciudad ${city} en la API de GeoDB Cities</p>`;
    } else {
      document
        .getElementById('noEncontrada')
        .setAttribute('style', 'display: none');
      document
        .getElementById('infoLugar')
        .setAttribute('style', 'display: inline-block');
      document
        .getElementById('divPais')
        .setAttribute('style', 'display: inline-block');
      document
        .getElementById('divRegion')
        .setAttribute('style', 'display: inline-block');
      document
        .getElementById('divPoblacion')
        .setAttribute('style', 'display: inline-block');
      document.getElementById('pais').innerHTML = country;
      document.getElementById('region').innerHTML = region;
      document.getElementById('poblacion').innerHTML = population;
    }

    // Muestro la informacion del tiempo
    const divCardWeather = document.getElementById('tarjetaTiempo');
    divCardWeather.innerHTML = '';
    const divWeatherActual = document.createElement('div');
    divWeatherActual.innerHTML = `
    <h2 id="titulo">${city},${countryCode != undefined ? countryCode : ''}</h2>
    <p id="temperatura">Temperatura Max/Min: ${data.days[0].tempmax} ºC / ${
      data.days[0].tempmin
    } ºC</p>
    <img id="imagen" src="./icons/${data.days[0].icon}.svg" alt="icono tiempo">
    <p id="descripcion">${data.days[0].conditions}</p>
    <p id="precipitacion">${
      data.days[0].precip != 0
        ? `Llueve. Tipo de lluvia: ${data.days[0].preciptype}`
        : 'No llueve'
    }</p>
    <p id="visibilidad">Visibilidad: ${data.days[0].visibility}</p>
    ${
      data.days[0].windspeed != 0
        ? `<p id="viento"><span>Viento:<span> Velocidad => ${data.days[0].windspeed} / Dirección => ${data.days[0].winddir}</p>`
        : ''
    }
    <p id="indiceUltraviloleta">Índice Ultravioleta: ${data.days[0].uvindex}</p>
    <p id="estaciones">Estaciones: ${getStations(data.stations)}</p>
  `;

    divCardWeather.appendChild(divWeatherActual);
  } else {
    // Oculto la imagen de cargando
    document.getElementById('cargando').setAttribute('style', 'display: none');
    // Muestro mensaje de error en la obtencion del tiempo
    document
      .getElementById('tarjetaTiempo')
      .setAttribute('style', 'display: none');
    document
      .getElementById('infoLugar')
      .setAttribute('style', 'display: block');
    document.getElementById('divPais').setAttribute('style', 'display: none');
    document.getElementById('divRegion').setAttribute('style', 'display: none');
    document
      .getElementById('divPoblacion')
      .setAttribute('style', 'display: none');
    document
      .getElementById('localizacion')
      .setAttribute('style', 'display: none');
    document
      .getElementById('noEncontrada')
      .setAttribute('style', 'display: block');
    document.getElementById('noEncontrada').innerHTML =
      '<p class="error">Error en la petición de obtención del tiempo a través de la API de Visual Crossing</p>';
  }
}

// Funcion para crear un string con el nombre de las estaciones y su id
function getStations(stations) {
  let stationsString = '';
  for (let stationId in stations) {
    if (stations.hasOwnProperty(stationId)) {
      stationsString += `<br>${stations[stationId].name} (${stationId})`;
    }
  }
  return stationsString;
}

// Funcion para mostrar el mapa con la localizacion de la ciudad
function showMap(latitude, longitude) {
  // Limpiar el mapa
  if (map != '') {
    document.getElementById('localizacion').innerHTML = '';
    map.remove();
  }
  // Muestro el mapa
  document
    .getElementById('localizacion')
    .setAttribute('style', 'display: block');
  const localizationDiv = document.getElementById('localizacion');
  // Creo el mapa
  const divMap = document.createElement('div');
  divMap.id = 'map';
  localizationDiv.appendChild(divMap);
  document.getElementById('map').innerHTML = '';
  map = new L.Map('map').setView([latitude, longitude], 12);
  // Creacion de la capa de OpenStreetMap
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
  }).addTo(map);
  // Creacion del marcador
  L.marker([latitude, longitude]).addTo(map).bindPopup(city).openPopup();
}

// Funcion para obtener y mostrar la prevision del tiempo para los proximos 10 dias
async function getWeatherNext10Days() {
  // Oculto la imagen de cargando
  document.getElementById('cargando').setAttribute('style', 'display: none');
  // Muestro la zona de previsión del tiempo para los próximos 10 días
  document
    .getElementById('prevision10Dias')
    .setAttribute('style', 'display: block');

  // Consulto la API de Visual Crossing
  const response = await fetch(
    `${VISUAL_CROSSING_API_URL}${city}${
      countryCode != undefined ? `,${countryCode}` : 'ES'
    }/next10days?lang=es&key=${API_KEY}&unitGroup=metric&contentType=json`
  );
  // Si la respuesta es correcta
  if (response.status === 200) {
    const data = await response.json();

    // Oculto la imagen de cargando
    document.getElementById('cargando').setAttribute('style', 'display: none');

    const weatherDiv = document.getElementById('prevision10Dias');
    weatherDiv.innerHTML = '';
    const cityDiv = document.createElement('div');
    cityDiv.innerHTML = `<h3>Previsión para los próximos 10 días de la ciudad de <span>${city}</span></h3>`;
    weatherDiv.appendChild(cityDiv);
    const div10days = document.createElement('div');
    div10days.id = 'tiempo10Dias';
    data.days.forEach((day, index) => {
      if (index === 0) {
        return;
      }
      const divWeatherDay = document.createElement('div');
      divWeatherDay.className = 'tarjetaTiempo';
      const divIcon = document.createElement('div');
      const divTemperatures = document.createElement('div');
      divIcon.innerHTML = `<img src="../icons/${day.icon}.svg" alt="icono tiempo">`;
      divTemperatures.innerHTML = `<p>${day.tempmax} ºC / ${day.tempmin} ºC</p>`;
      divWeatherDay.appendChild(divIcon);
      divWeatherDay.appendChild(divTemperatures);
      div10days.appendChild(divWeatherDay);
      weatherDiv.appendChild(div10days);
    });
  }
}
