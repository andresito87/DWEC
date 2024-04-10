//creacion de la lista de sonidos
let sonidos = [];
for (let i = 1; i <= 25; i++) {
  sonidos.push(`./audio/${i}.wav`);
}
let sonidosAReproducir = [];

//creación del menú
let body = document.querySelector('body');
body.style.backgroundColor = 'grey';
let menu = document.createElement('div');
menu.classList.add('menu');
let titulo = document.createElement('h1');
titulo.textContent = 'DAW - Syntetizer';
menu.appendChild(titulo);
let autor = document.createElement('h2');
autor.textContent = 'Autor: Andrés Samuel Podadera González';
menu.appendChild(autor);
body.appendChild(menu);

//creación del botón de inicio
let botonInicio = document.createElement('button');
botonInicio.classList.add('boton');
botonInicio.textContent = 'Inicio';
body.appendChild(botonInicio);

//creación del contenedor y los botones de control
let divContenedor = document.createElement('div');
divContenedor.classList.add('contenedor');
let botonesControl = document.createElement('div');
botonesControl.classList.add('botonesControl');

//evento mousedown para el botón de inicio
botonInicio.addEventListener('mousedown', () => {
  body.removeChild(botonInicio);
  body.removeChild(menu);
  crearTablero();
  crearZonaInformativa();
  crearBotonesControl();
  body.appendChild(divContenedor);
  body.appendChild(botonesControl);
});

//creación del tablero, la zona informativa y los botones de control
let tablero = document.createElement('div');
let zonaInformativa = document.createElement('div');
let botonReproducir = document.createElement('button');
let botonParar = document.createElement('button');
let botonPararPulsado = false;
let botonBorrar = document.createElement('button');
let botonBorrarPulsado = false;
let sonido = document.createElement('audio');
let arrayTimeout = [];

// función para crear el tablero y añadir los eventos a las casillas
function crearTablero() {
  tablero.classList.add('tablero');
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let casilla = document.createElement('button');
      casilla.classList.add('casilla');
      casilla.textContent = i * 5 + j + 1;
      /*añadir dentro de cada button un elemento audio con la ruta del archivo de audio correspondiente.*/
      let audio = document.createElement('audio');
      audio.src = sonidos[i * 5 + j];
      casilla.appendChild(audio);
      casilla.addEventListener('mousedown', () => {
        casilla.classList.toggle('casillaPulsada');
        if (casilla.classList.contains('casillaPulsada')) {
          sonidosAReproducir.push(audio);
          audio.play();
        } else {
          sonidosAReproducir = sonidosAReproducir.filter(
            sonido => sonido !== audio
          );
        }
      });
      casilla.addEventListener('mouseover', () => {
        casilla.classList.add('casillaHover');
      });
      casilla.addEventListener('mouseout', () => {
        casilla.classList.remove('casillaHover');
      });
      tablero.appendChild(casilla);
    }
  }
  divContenedor.appendChild(tablero);
}

// función para crear la zona informativa lateral al tablero
function crearZonaInformativa() {
  zonaInformativa.classList.add('zonaInformativa');
  zonaInformativa.style.backgroundImage = 'url(./img/corazones.gif)';
  let titulo = document.createElement('h1');
  titulo.classList.add('textoInformativo');
  titulo.textContent = 'DAW - Syntetizer';
  titulo.style.color = 'white';
  titulo.style.backgroundColor = 'rgba(0, 0, 0)';
  titulo.style.fontFamily = 'Arial, sans-serif';
  titulo.style.textAlign = 'center';
  zonaInformativa.appendChild(titulo);
  let parrafoSobreMusica = document.createElement('p');
  parrafoSobreMusica.style.color = 'white';
  parrafoSobreMusica.style.textAlign = 'left';
  parrafoSobreMusica.style.padding = '10px';
  parrafoSobreMusica.style.margin = '10px';
  parrafoSobreMusica.style.backgroundColor = 'rgba(0, 0, 0)';
  parrafoSobreMusica.style.fontSize = '1.5em';
  parrafoSobreMusica.style.fontFamily = 'Arial, sans-serif';
  parrafoSobreMusica.textContent =
    'La música y los ritmos han sido esenciales en todas las culturas a lo largo de la historia. Desde tambores antiguos hasta la música electrónica moderna, los ritmos han evolucionado y se han fusionado con diferentes estilos musicales, reflejando la diversidad cultural. Han sido utilizados para comunicar, celebrar y expresar emociones. Tanto en la música clásica como en la popular, los ritmos siguen siendo la base de la creatividad musical.';
  zonaInformativa.appendChild(parrafoSobreMusica);

  //añadir dos imagenes a la zona informativa
  let divImagenes = document.createElement('div');
  divImagenes.classList.add('divImagenes');
  let imagen1 = document.createElement('img');
  imagen1.src = './img/ciudad.jpeg';
  imagen1.classList.add('imagenInformativa');
  divImagenes.appendChild(imagen1);
  let imagen2 = document.createElement('img');
  imagen2.src = './img/estudio.jpeg';
  imagen2.classList.add('imagenInformativa');
  divImagenes.appendChild(imagen2);
  zonaInformativa.appendChild(divImagenes);
  divContenedor.appendChild(zonaInformativa);
}

// función para cargar los sonidos con las casillas marcadas
function cargarSonidosConCasillaMarcada() {
  let casillas = document.querySelectorAll('.casilla');
  casillas.forEach(casilla => {
    if (casilla.classList.contains('casillaPulsada')) {
      sonidosAReproducir.push(casilla.querySelector('audio'));
    }
  });
}

// función para crear los botones de control
function crearBotonesControl() {
  // agregar estilos y eventos al botonReproducir
  botonReproducir.classList.add('boton');
  botonReproducir.textContent = 'Reproducir';
  botonReproducir.addEventListener('mousedown', () => {
    if (botonPararPulsado) botonPararPulsado = false;

    let retraso = 0; // Variable para mantener el retraso acumulado

    for (let i = 0; i < sonidosAReproducir.length; i++) {
      // Para los sonidos subsiguientes, espera hasta que el sonido anterior haya terminado antes de reproducir el siguiente
      let timeoutID = setTimeout(
        sonido => {
          sonido.play();
        },
        retraso * 1000,
        sonidosAReproducir[i]
      ); // Espera la duración del sonido anterior antes de reproducir el siguiente
      arrayTimeout.push(timeoutID);
      // Aumenta el retraso acumulado con la duración del sonido actual
      retraso += sonidosAReproducir[i].duration;
    }
  });
  botonesControl.appendChild(botonReproducir);

  // agregar estilos y eventos al botonParar
  botonParar.classList.add('boton');
  botonParar.textContent = 'Parar';
  botonParar.addEventListener('mousedown', () => {
    arrayTimeout.map(timeoutID => clearTimeout(timeoutID));
    botonPararPulsado = true;
  });
  botonesControl.appendChild(botonParar);

  // agregar estilos y eventos al botonBorrar
  botonBorrar.classList.add('boton');
  botonBorrar.textContent = 'Borrar';
  botonBorrar.addEventListener('mousedown', () => {
    botonBorrarPulsado = true;
    let casillas = document.querySelectorAll('.casilla');
    casillas.forEach(casilla => {
      sonidosAReproducir = [];
      casilla.classList.remove('casillaPulsada');
    });
  });
  botonesControl.appendChild(botonBorrar);
}

/*añadir a todos los botones un evento mouseover que cambie el color por una sombra y un evento mouseout que lo devuelva a su color original.*/
let botones = document.querySelectorAll('.boton');
botones.forEach(boton => {
  boton.addEventListener('mouseover', () => {
    boton.classList.add('botonHover');
  });
  boton.addEventListener('mouseout', () => {
    boton.classList.remove('botonHover');
  });
});
