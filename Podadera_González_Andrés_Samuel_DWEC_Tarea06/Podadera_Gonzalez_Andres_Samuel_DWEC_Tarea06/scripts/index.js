let city = '';
let countryCode = '';
let country = '';
let population = '';
let region = '';
let placeType = '';
let latitude = '';
let longitude = '';
let localizationFound;
let requestErrorApiGeoDB;

const API_KEY = '67GUAUV4UMRXHYN5VKG7VBTLA';
const VISUAL_CROSSING_API_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const GEODB_API_URL = `http://geodb-free-service.wirefreethought.com/v1/geo/places`;

// Cuando se termine de cargar el contenido de la pagina, se ejecutara el siguiente codigo
$(document).ready(() => {
  // Oculto los títulos de la información de la ciudad y la imagen de cargando
  $('#infoLugar').css('display', 'none');
  $('#localizacion').css('display', 'none');
  $('#tarjetaTiempo').css('display', 'none');
  $('#cargando').css('display', 'none');
  $('#geolocalizacion').css('display', 'none');

  // Añado evento click en el boton de tiempo actual
  $('#botonPrevisionDiaActual').click(async event => {
    event.preventDefault();
    // Oculto la informacion de la ciudad, la prevision del tiempo y el mapa
    $('#tiempoActual').css('display', 'none');
    // Oculto la zona de la previsión de los próximos 10 días
    $('#prevision10Dias').css('display', 'none');
    // Oculto la zona de la previsión por geo localizacion
    $('#geolocalizacion').css('display', 'none');
    // Muestro la imagen de cargando
    $('#cargando').css('display', 'block');
    localizationFound = false;
    requestErrorApiGeoDB = false;
    // obtener la ciudad
    await getCity();
    // obtener la informacion de la ciudad
    await getInfoLocalization(city);
    // obtener y mostrar el tiempo
    await getWeather();
    // mostrar el mapa con la localizacion de la ciudad(latitude y longitude)
    showMap(latitude, longitude);
  });

  // Añado evento click en el boton de tiempo para los proximos 10 dias
  $('#botonPrevisionProximos10Dias').click(async event => {
    event.preventDefault();
    // Oculto la informacion de la ciudad, la prevision del tiempo y el mapa
    $('#tiempoActual').css('display', 'none');
    // Oculto la previsión del tiempo de los próximos 10 días
    $('#prevision10Dias').css('display', 'none');
    // OCulto la zona de la previsión por geo localizacion
    $('#geolocalizacion').css('display', 'none');
    // Muestro la imagen de cargando
    $('#cargando').css('display', 'block');
    localizationFound = false;
    requestErrorApiGeoDB = false;
    // obtener la ciudad
    await getCity();
    // obtener la informacion de la ciudad
    await getInfoLocalization(city);
    // obtener y mostrar el tiempo para los proximos 10 dias
    await getWeatherNext10Days();
  });
});

// Añado evento click en el boton de geolocalizacion
$('#botonGeolocalizacion').click(async event => {
  event.preventDefault();
  // obtener la geolocalizacion del usuario, mostrar la previsión del tiempo y el mapa
  await getGeolocation();
});

// Funcion para obtener la ciudad apartir de los datos introducidos por el usuario
async function getCity() {
  city = $('#ciudad').val().trim().split(',')[0];
  countryCode = $('#ciudad').val().trim().split(',')[1];
  if (city == undefined || city === '') {
    alert('Introduce una ciudad');
    city = undefined;
  } else if (countryCode === '') {
    countryCode = undefined;
    country = undefined;
  } else if (city != undefined && city.length < 4) {
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
  await fetch(`${GEODB_API_URL}?namePrefix=${city}&languageCode=es`)
    .then(response => response.json())
    .then(data => {
      for (let localization of data.data) {
        if (localization.countryCode === 'ES') {
          countryCode = localization.countryCode;
          placeType = localization.placeType;
          region = localization.region;
          population = localization.population;
          country = localization.country;
          localizationFound = true;
          break;
        } else if (
          countryCode != undefined &&
          localization.countryCode === countryCode
        ) {
          countryCode = localization.countryCode;
          placeType = localization.placeType;
          region = localization.region;
          population = localization.population;
          country = localization.country;
          localizationFound = true;
          break;
        } else {
          countryCode = 'ES';
          placeType = undefined;
          region = undefined;
          population = undefined;
          country = undefined;
        }
      }
    })
    .catch(error => {
      console.log(error);
      countryCode = 'ES';
      placeType = undefined;
      region = undefined;
      population = undefined;
      country = undefined;
      localizationFound = false;
      requestErrorApiGeoDB = true;
    });
}

// Funcion para obtener y mostrar la prevision del tiempo actual
async function getWeather() {
  // Oculto la tarjeta del tiempo
  $('#tarjetaTiempo').css('display', 'none');

  // Si no se ha introducido una ciudad
  if (city === undefined) {
    // Oculto la imagen de cargando
    $('#cargando').css('display', 'none');
    return;
  }

  // hubo un error en alguna de las peticiones anteriormente
  if (requestErrorApiGeoDB) {
    // Oculto la imagen de cargando
    $('#cargando').css('display', 'none');
    // Muestro mensaje de error en la obtencion del tiempo
    $('#tarjetaTiempo').css('display', 'none');
    $('#infoLugar').css('display', 'block');
    $('#divPais').css('display', 'none');
    $('#divRegion').css('display', 'none');
    $('#divPoblacion').css('display', 'none');
    $('#localizacion').css('display', 'none');
    $('#noEncontrada').css('display', 'block');
    $('#noEncontrada').html(
      '<p class="error">Error en la petición de obtención de la información de la ciudad a través de la API de GeoDB Cities</p>'
    );
  }

  // Consulto la API de Visual Crossing
  await fetch(
    `${VISUAL_CROSSING_API_URL}${city}${
      countryCode != undefined ? `,${countryCode}` : ''
    }/today?unitGroup=metric&lang=es&key=${API_KEY}`
  )
    .then(response => response.json())
    .then(data => {
      // Guardo la longitud y latitud de la ciudad
      latitude = data.latitude;
      longitude = data.longitude;

      // Oculto la imagen de cargando
      $('#cargando').css('display', 'none');
      // Muestro el div contenedor de la información a mostrar
      $('#divPrevisionMapa').css('display', 'flex');
      $('#divPrevisionMapa').css('justify-content', 'space-around');
      $('#tiempoActual').css('display', 'inline-block');
      $('#infoLugar').css('display', 'block');

      // Muestro la tarjeta del tiempo
      $('#tarjetaTiempo').css('display', 'block');
      $('#localizacion').css('display', 'block');
      // Muestro la informacion de la ciudad
      if (!requestErrorApiGeoDB && !localizationFound) {
        $('#divPais').css('display', 'none');
        $('#divRegion').css('display', 'none');
        $('#divPoblacion').css('display', 'none');
        $('#noEncontrada').css('display', 'block');
        $('#noEncontrada').html(
          `<p class="error">No se ha encontrado la ciudad ${city} en la API de GeoDB Cities</p>`
        );
      } else if (!requestErrorApiGeoDB && localizationFound) {
        $('#noEncontrada').css('display', 'none');
        $('#divPais').css('display', 'inline-block');
        $('#divRegion').css('display', 'inline-block');
        $('#divPoblacion').css('display', 'inline-block');
        $('#pais').html(country);
        $('#region').html(region);
        $('#poblacion').html(population);
      } else if (requestErrorApiGeoDB) {
        $('#divPais').css('display', 'none');
        $('#divRegion').css('display', 'none');
        $('#divPoblacion').css('display', 'none');
        $('#noEncontrada').css('display', 'block');
        $('#noEncontrada').html(
          `<p class="error">Hubo un error en la petición a la API de GeoDB Cities</p>`
        );
      } else {
        $('#noEncontrada').css('display', 'none');
        $('#divPais').css('display', 'inline-block');
        $('#divRegion').css('display', 'inline-block');
        $('#divPoblacion').css('display', 'inline-block');
        $('#pais').html(country);
        $('#region').html(region);
        $('#poblacion').html(population);
      }

      // Muestro la informacion del tiempo
      $('#tarjetaTiempo').empty();
      const divWeatherActual = document.createElement('div');
      divWeatherActual.innerHTML = `
    <h2 id="titulo">${city}${
        countryCode != undefined ? `,${countryCode}` : ''
      }</h2>
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

      $('#tarjetaTiempo').append(divWeatherActual);
    })
    .catch(error => {
      console.log(error);
      // Oculto la imagen de cargando
      $('#cargando').css('display', 'none');
      $('#tiempoActual').css('display', 'block');
      $('#tarjetaTiempo').css('display', 'none');
      $('#divPrevisionMapa').css('display', 'none');
      $('#infoLugar').css('display', 'block');
      $('#divPais').css('display', 'none');
      $('#divRegion').css('display', 'none');
      $('#divPoblacion').css('display', 'none');
      $('#localizacion').css('display', 'none');
      // Muestro mensaje de error en la obtencion del tiempo
      $('#noEncontrada').css('display', 'block');
      $('#noEncontrada').html(
        '<p class="error">Error en la petición de obtención del tiempo a través de la API de Visual Crossing</p>'
      );
    });
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
  // Elimino el mapa si ya existe, al haber buscado la prevision por geolocalizacion
  if (document.getElementById('map')) {
    $('#map').remove();
  }
  // Muestro el mapa
  $('#localizacion').css('display', 'block');
  const localizationDiv = document.getElementById('localizacion');
  // Creo el mapa
  const divMap = document.createElement('div');
  divMap.id = 'map';
  localizationDiv.appendChild(divMap);
  document.getElementById('map').innerHTML = '';
  const map = new L.Map('map').setView([latitude, longitude], 12);
  // Creacion de la capa de OpenStreetMap
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
    map
  );
  // Ajusto el zoom
  map.setZoom(13);
  // Creacion del marcador
  L.marker([latitude, longitude]).addTo(map).bindPopup(city).openPopup();
}

// Funcion para obtener y mostrar la prevision del tiempo para los proximos 10 dias
async function getWeatherNext10Days() {
  // Oculto la imagen de cargando
  $('#cargando').css('display', 'none');

  // Si no se ha introducido una ciudad
  if (city === undefined) {
    return;
  }

  // Muestro la zona de previsión del tiempo para los próximos 10 días
  $('#prevision10Dias').css('display', 'block');

  // Consulto la API de Visual Crossing
  $.ajax(
    `${VISUAL_CROSSING_API_URL}${city}${
      countryCode != undefined ? `,${countryCode}` : ',ES'
    }/next10days?lang=es&key=${API_KEY}&unitGroup=metric&contentType=json`,
    {
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        // Oculto la imagen de cargando
        document
          .getElementById('cargando')
          .setAttribute('style', 'display: none');

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
          divIcon.innerHTML = `<img src="./icons/${day.icon}.svg" alt="icono tiempo">`;
          divTemperatures.innerHTML = `<p>${day.tempmax} ºC / ${day.tempmin} ºC</p>`;
          divWeatherDay.appendChild(divIcon);
          divWeatherDay.appendChild(divTemperatures);
          div10days.appendChild(divWeatherDay);
          weatherDiv.appendChild(div10days);
        });
      },
      error: function (error) {
        console.log(error);
        // Oculto la imagen de cargando
        $('#cargando').css('display', 'none');
        // Muestro mensaje de error en la obtencion del tiempo
        $('#prevision10Dias').html(
          '<p class="error">Error en la petición de obtención del tiempo a través de la API de Visual Crossing</p>'
        );
      },
    }
  );
}

async function getGeolocation() {
  // Limpio el input de ciudad
  $('#ciudad').val('');
  // Oculto la informacion de la ciudad, la prevision del tiempo y el mapa
  $('#tiempoActual').css('display', 'none');
  // Oculto la previsión del tiempo de los próximos 10 días
  $('#prevision10Dias').css('display', 'none');
  // OCulto la zona de la previsión por geo localizacion
  $('#geolocalizacion').css('display', 'none');
  // Muestro la imagen de cargando
  $('#cargando').css('display', 'block');

  const divCardWeather = document.getElementById('previsionGeolocalizacion');
  // Compruebo si el navegador soporta la geolocalizacion
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const myPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        // Consulto la API de Visual Crossing
        await fetch(
          `${VISUAL_CROSSING_API_URL}${myPosition.latitude},${myPosition.longitude}/today?unitGroup=metric&lang=es&key=${API_KEY}`
        )
          .then(response => response.json())
          .then(data => {
            // Oculto la imagen de cargando
            $('#cargando').css('display', 'none');
            // Muestro la zona de previsión por geolocalizacion
            $('#geolocalizacion').css('display', 'block');
            // Muestro la previsión del tiempo
            divCardWeather.innerHTML = '';
            const divWeatherActual = document.createElement('div');
            divWeatherActual.innerHTML = `
        <h2 id="titulo">La previsión para la localización marcada en el mapa es:</h2>
        <p id="temperatura">Temperatura Max/Min: ${data.days[0].tempmax} ºC / ${
              data.days[0].tempmin
            } ºC</p>
        <img id="imagen" src="./icons/${
          data.days[0].icon
        }.svg" alt="icono tiempo">
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
        <p id="indiceUltraviloleta">Índice Ultravioleta: ${
          data.days[0].uvindex
        }</p>
        <p id="latitud">Latitud: ${myPosition.latitude}</p>
        <p id="longitud">Longitud: ${myPosition.longitude}</p>
      `;

            divCardWeather.appendChild(divWeatherActual);

            // Primero elimino el mapa si ya existe, al haber buscado la prevision del dia actual
            if (document.getElementById('map')) {
              $('#map').remove();
            }
            // Muestro el mapa
            $('#mapaGeolocalizacion').css('display', 'block');
            const localizationDiv = document.getElementById(
              'mapaGeolocalizacion'
            );
            // Creo el mapa
            const divMap = document.createElement('div');
            divMap.id = 'map';
            localizationDiv.appendChild(divMap);
            divMap.innerHTML = '';
            const map = new L.Map('map').setView(
              [myPosition.latitude, myPosition.longitude],
              12
            );
            // Creacion de la capa de OpenStreetMap
            L.tileLayer(
              'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              {}
            ).addTo(map);
            // Ajusto el zoom
            map.setZoom(10);
            // Creacion del marcador
            L.marker([myPosition.latitude, myPosition.longitude])
              .addTo(map)
              .bindPopup('Usted está aquí')
              .openPopup();

            // Añadir el mapa al div
            localizationDiv.appendChild(divMap);

            // Añado evento click sobre el mapa
            addingEventClickMap(map);
          })
          .catch(error => {
            console.log(error);
            // Oculto la imagen de cargando
            $('#cargando').css('display', 'none');
            // Muestro la zona de previsión por geolocalizacion
            $('#geolocalizacion').css('display', 'block');
            // Oculto el mapa de geolocalizacion
            $('#mapaGeolocalizacion').css('display', 'none');
            // Muestro mensaje de error en la obtencion del tiempo
            divCardWeather.innerHTML =
              '<p class="error">Error en la petición de obtención del tiempo a través de la API de Visual Crossing</p>';
          });
      },
      function (error) {
        console.log(error);
        // Oculto la imagen de cargando
        $('#cargando').css('display', 'none');
        // Muestro la zona de previsión por geolocalizacion
        $('#geolocalizacion').css('display', 'block');
        // Muestro mensaje de error de acceso a la geolocalizacion
        $('#geolocalizacion').html(
          '<p class="error">Error en la petición a Visual Crossing para obtener la previsión del tiempo para tu posicion</p>'
        );
        // Oculto el div que muestra el mapa
        $('#mapaGeolocalizacion').css('display', 'none');
      }
    );
  } else {
    // Oculto la imagen de cargando
    $('#cargando').css('display', 'none');
    // Muestro la zona de previsión por geolocalizacion
    $('#geolocalizacion').css('display', 'block');
    // Muestro mensaje de error de no soportar la geolocalizacion
    divCardWeather.innerHTML =
      '<p class="error">El navegador no soporta la geolocalización</p>';
    // Oculto el div que muestra el mapa
    $('#mapaGeolocalizacion').css('display', 'none');
  }
}

// Funcion para añadir evento click en el mapa, permitiendo obtener la previsión del tiempo en la localización marcada
function addingEventClickMap(map) {
  map.on('click', async function (e) {
    // Muestro la zona de previsión por geolocalizacion
    $('#geolocalizacion').css('display', 'block');

    // Consulto la API de Visual Crossing
    await fetch(
      `${VISUAL_CROSSING_API_URL}${e.latlng.lat},${e.latlng.lng}/today?unitGroup=metric&lang=es&key=${API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        // Oculto la imagen de cargando
        $('#cargando').css('display', 'none');

        // Muestro la previsión del tiempo
        $('#previsionGeolocalizacion').empty();
        const divWeatherActual = document.createElement('div');
        divWeatherActual.innerHTML = `
      <h2 id="titulo">La previsión para la localización marcada en el mapa es:</h2>
      <p id="temperatura">Temperatura Max/Min: ${data.days[0].tempmax} ºC / ${
          data.days[0].tempmin
        } ºC</p>
      <img id="imagen" src="./icons/${
        data.days[0].icon
      }.svg" alt="icono tiempo">
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
      <p id="indiceUltraviloleta">Índice Ultravioleta: ${
        data.days[0].uvindex
      }</p>
      <p id="latitud">Latitud: ${e.latlng.lat}</p>
      <p id="longitud">Longitud: ${e.latlng.lng}</p>
    `;
        cleanMarkersAndAddingNewMarker(map, e.latlng.lat, e.latlng.lng);
        $('#previsionGeolocalizacion').append(divWeatherActual);
      })
      .catch(error => {
        console.log(error);
        // Oculto la imagen de cargando
        $('#cargando').css('display', 'none');
        // Muestro la zona de previsión por geolocalizacion
        $('#geolocalizacion').css('display', 'block');
        // Muestro mensaje de error en la obtencion del tiempo
        $('#previsionGeolocalizacion').html(
          '<p class="error">Error en la petición de obtención del tiempo a través de la API de Visual Crossing</p>'
        );
      });
  });
}

// Funcion para limpiar los marcadores y añadir un nuevo marcador en la localizacion marcada
function cleanMarkersAndAddingNewMarker(map, latitude, longitude) {
  // Elimino los marcadores
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  // Creacion del marcador
  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup('Latitud: ' + latitude + '<br>Longitud: ' + longitude)
    .openPopup();
}
