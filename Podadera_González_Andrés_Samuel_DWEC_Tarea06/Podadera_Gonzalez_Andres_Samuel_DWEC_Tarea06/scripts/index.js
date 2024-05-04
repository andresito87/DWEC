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

// Cuando se carga la pagina, se muestra el tiempo de Madrid
document.addEventListener('DOMContentLoaded', () => {
  // Oculto los títulos de la información de la ciudad y la imagen de cargando
  document.getElementById('info_lugar').setAttribute('style', 'display: none');
  document
    .getElementById('tarjetaTiempo')
    .setAttribute('style', 'display: none');
  document.getElementById('cargando').setAttribute('style', 'display: none');
  // Funcion para cargar los datos de la ciudad, pais
  async function setCityCountry() {
    countryCode = '';
    city = '';
    country = '';
    let dataInput = document.getElementById('ciudad').value;
    city = dataInput.split(',')[0];
    if (dataInput.length == 0) {
      alert('Introduce una ciudad');
      document
        .getElementById('cargando')
        .setAttribute('style', 'display: none');
      return;
    }
    if (dataInput.split(',')[1] == undefined) {
      countryCode = await getCountryCode(city);
    } else {
      countryCode = dataInput.split(',')[1].toUpperCase();
    }
  }

  // Funcion para obtener el codigo de pais de una ciudad, atraves de la API de GeoDB Cities
  async function getCountryCode(city) {
    const response = await fetch(
      `${GEODB_API_URL}?namePrefix=${city}&languageCode=es`
    );
    const data = await response.json();
    console.log(data);
    if (data.metadata['totalCount'] > 0) {
      for (let localization of data.data) {
        if (localization.countryCode === 'ES' && localization.name === city) {
          placeType = localization.placeType;
          return localization.countryCode;
        }
      }
    } else {
      return undefined;
    }
  }

  //-----------------------------------------//
  // Consulta a la API de VisualCrossing para obtener el tiempo - https://www.visualcrossing.com/
  //-----------------------------------------//

  // Funcion para obtener el tiempo de una ciudad
  async function getWeather(city) {
    if (countryCode === undefined) {
      return;
    }
    const response = await fetch(
      `${API_URL}${city}${
        countryCode == undefined ? '' : `,${countryCode}`
      }?lang=es&key=${API_KEY}&unitGroup=metric&contentType=json`
    );
    const data = await response.json();
    return data.days;
  }

  // Funcion para mostrar el tiempo en la pagina
  async function showWeather(weather) {
    // Borrar todos los div con la clase notFound
    const notFound = document.getElementsByClassName('notFound');
    while (notFound.length > 0) {
      notFound[0].remove();
    }
    await getInfoLocalization();
    const divWeather = document.getElementById('tiempoActual');
    const divInfoLocalization = document.getElementById('info_lugar');
    const divCardWeather = document.getElementById('tarjetaTiempo');
    const divMap = document.getElementById('mapa');
    // Si no se encuentra la localizacion, se muestra un mensaje
    if (latitud === undefined || longitud === undefined) {
      divInfoLocalization.setAttribute('style', 'display: none');
      divCardWeather.setAttribute('style', 'display: none');
      divMap.setAttribute('style', 'display: none');
      document
        .getElementById('cargando')
        .setAttribute('style', 'display: none');
      const infoNotFound = document.createElement('div');
      infoNotFound.innerHTML =
        '<h2 class="notFound">Localización no encontrada</h2>';
      divWeather.appendChild(infoNotFound);
      return;
    }
    // Se ha encontrado la localizacion
    divInfoLocalization.setAttribute('style', 'display: block');
    divCardWeather.setAttribute('style', 'display: block');
    divMap.setAttribute('style', 'display: block');
    // Muestro los titulos de la información de la ciudad
    document
      .getElementById('info_lugar')
      .setAttribute('style', 'display: block');
    const divPopulation = document.getElementById('poblacion');
    const divCountry = document.getElementById('pais');
    const divRegion = document.getElementById('region');
    divRegion.innerHTML = region;
    divPopulation.innerHTML = population;
    divCountry.innerHTML = country;
    divCardWeather.innerHTML = '';
    const divWeatherActual = document.createElement('div');
    // Elijo mostrar el tiempo actual de la primera hora del dia
    weather = weather[0];
    divWeatherActual.innerHTML = `
    <h2 id="titulo">${city}</h2>
    <p id="temperatura">Temperatura Max/Min: ${weather.tempmax} ºC / ${
      weather.tempmin
    } ºC</p>
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
    await getCountryCode(city);
    const weather = await getWeather(city);
    await showWeather(weather);
    document.getElementById('cargando').setAttribute('style', 'display: none');
    document
      .getElementById('tiempoActual')
      .setAttribute('style', 'display', 'block');
  }

  // Evento para mostrar el tiempo de una ciudad
  document
    .getElementById('botonPrevisionDiaActual')
    .addEventListener('click', () => {
      document
        .getElementById('cargando')
        .setAttribute('style', 'display: block');
      document
        .getElementById('tiempoActual')
        .setAttribute('style', 'display: none');
      document.getElementById('prevision10Dias').innerHTML = '';
      document.getElementById('localizacion').innerHTML = '';
      setCityCountry();
      showCityWeather(city);
    });

  // Funcion para obtener el tiempo de los proximos 10 dias de una ciudad
  async function getWeather10(city) {
    const response = await fetch(
      `${API_URL}${city},${countryCode}/next9days?lang=es&key=${API_KEY}&unitGroup=metric&contentType=json`
    );
    const data = await response.json();
    return data.days;
  }

  // Funcion para mostrar el tiempo de los proximos 10 dias de una ciudad
  async function showCityWeather10(city) {
    // Borrar todos los div con la clase notFound
    const notFound = document.getElementsByClassName('notFound');
    while (notFound.length > 0) {
      notFound[0].remove();
    }
    // TODO
    const weather = await getWeather10(city);
    const weatherDiv = document.getElementById('prevision10Dias');
    weatherDiv.innerHTML = '';
    const cityDiv = document.createElement('div');
    cityDiv.innerHTML = '<h2>' + city + '</h2>';
    weatherDiv.appendChild(cityDiv);
    const div10days = document.createElement('div');
    div10days.id = 'tiempo10Dias';
    weather.forEach(day => {
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

  // Evento para mostrar el tiempo de los proximos 10 dias de una ciudad
  document
    .getElementById('botonPrevision10Dias')
    .addEventListener('click', () => {
      document
        .getElementById('info_lugar')
        .setAttribute('style', 'display: none');
      document
        .getElementById('tarjetaTiempo')
        .setAttribute('style', 'display: none');
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
  document
    .getElementById('botonLocalizacion')
    .addEventListener('click', async () => {
      // Borrar todos los div con la clase notFound
      const notFound = document.getElementsByClassName('notFound');
      while (notFound.length > 0) {
        notFound[0].remove();
      }
      document
        .getElementById('info_lugar')
        .setAttribute('style', 'display: none');
      document
        .getElementById('tarjetaTiempo')
        .setAttribute('style', 'display: none');
      document.getElementById('prevision10Dias').innerHTML = '';
      document.getElementById('tarjetaTiempo').innerHTML = '';
      const localizationDiv = document.getElementById('localizacion');
      setCityCountry();
      await getInfoLocalization();

      // Si no se encuentra la localizacion, se muestra un mensaje
      if (latitud === undefined || longitud === undefined) {
        document.getElementById('localizacion').innerHTML = '';
        localizationDiv.innerHTML =
          '<h2 class="notFound">Localización no encontrada</h2>';
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

  // Funcion para obtener la latitud y longitud de una ciudad
  async function getInfoLocalization() {
    const response = await fetch(
      `${GEODB_API_URL}?limit=5&offset=0&types=CITY&namePrefix=${city}&languageCode=es`
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
      country = undefined;
    }
  }
});
