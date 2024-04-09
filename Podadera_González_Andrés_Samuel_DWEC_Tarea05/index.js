//creacion de la lista de sonidos
let sonidos = [];
for (let i = 1; i <= 25; i++) {
  sonidos.push(`./audio/${i}.wav`);
}
let sonidosAReproducir = [];
//creación del menú y botón inicio
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
let botonInicio = document.createElement('button');
botonInicio.classList.add('boton');
botonInicio.textContent = 'Inicio';
body.appendChild(botonInicio);
//creación del contenedor y los botones de control
let divContenedor = document.createElement('div');
divContenedor.classList.add('contenedor');
let botonesControl = document.createElement('div');
botonesControl.classList.add('botonesControl');
botonInicio.addEventListener('mousedown', () => {
  body.removeChild(botonInicio);
  body.removeChild(menu);
  crearTablero();
  crearZonaInformativa();
  crearCanvas();
  crearBotonesControl();
  body.appendChild(divContenedor);
  body.appendChild(botonesControl);
});
let tablero = document.createElement('div');
let zonaInformativa = document.createElement('div');
let botonReproducir = document.createElement('button');
let botonParar = document.createElement('button');
let botonPararPulsado = false;
let botonBorrar = document.createElement('button');
let botonBorrarPulsado = false;
let contenedorCanvas = document.createElement('div');
contenedorCanvas.classList.add('contenedorCanvas');
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let context;
let analyser;
let sonido = document.createElement('audio');
let arrayTimeout = [];

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

//crear un canvas con un mensaje de bienvenida
function crearCanvas() {
  canvas.width = 600;
  canvas.height = 400;
  contenedorCanvas.appendChild(canvas);
  zonaInformativa.appendChild(contenedorCanvas);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 400);
  ctx.fillStyle = 'white';
  ctx.font = '30px Arial';
  ctx.fillText('¡Bienvenido a DAW Syntetizer!', 50, 50);
  ctx.font = '20px Helvetica';
  ctx.fillText('Marca los sonidos que desees escuchar', 50, 100);
  ctx.fillText('y pulsa el botón de reproducir', 50, 120);
  ctx.fillText(
    'Esta version no dibuja el sintetizador aquí en canvas',
    50,
    180
  );
  ctx.fillText(
    'debido a problemas con setTimeout y funciones asíncronas',
    50,
    200
  );
  ctx.fillText(
    'Se añade otra version llamada DAW Syntetizer 2.0 que sí',
    50,
    220
  );
  ctx.fillText('dibuja en canvas. Todo basado en eventos.', 50, 240);
}

function crearZonaInformativa() {
  zonaInformativa.classList.add('zonaInformativa');
  zonaInformativa.style.backgroundImage = 'url(./img/corazones.gif)';
  let texto = document.createElement('h1');
  texto.classList.add('textoInformativo');
  texto.textContent = 'DAW - Syntetizer';
  texto.style.color = 'white';
  zonaInformativa.appendChild(texto);
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

function cargarSonidosConCasillaMarcada() {
  let casillas = document.querySelectorAll('.casilla');
  casillas.forEach(casilla => {
    if (casilla.classList.contains('casillaPulsada')) {
      sonidosAReproducir.push(casilla.querySelector('audio'));
    }
  });
}

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

async function actualizarCanvas(sonido) {
  // 1. Definir los elementos y los eventos
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const drawAudio = analyser => {
    let ctx = canvas.getContext('2d');
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    // Limpiar el canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Dibujar el fondo
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Obtener datos de frecuencia
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    // Calcular el ancho de las barras
    const barWidth = (WIDTH / bufferLength) * 3;
    let x = 0;

    // Dibujar las barras
    dataArray.forEach((decibel, index) => {
      const c = index / bufferLength;
      const r = decibel + 25 * c;
      const g = 250 * c;
      const b = 250;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, HEIGHT - decibel, barWidth, decibel);
      x += barWidth + 1;
    });
    // Verificar si hay más canciones
    if (sonidosAReproducir.length > 0 && !botonPararPulsado) {
      // Solicitar el próximo cuadro de animación
      requestAnimationFrame(() => drawAudio(analyser));
    }
  };

  // Verificar si el analizador ya está inicializado
  if (!analyser) {
    await initAnalyser(sonido);
  }
  // dibujar
  drawAudio(analyser);
}
// Función para inicializar el analizador
async function initAnalyser(audio) {
  if (!context) {
    await initAudioContext();
  }

  const src = context.createMediaElementSource(audio);
  analyser = context.createAnalyser();
  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 256;
}

// Función para inicializar el contexto de audio y el analizador
async function initAudioContext() {
  // Verificar si el contexto de audio ya está creado
  if (!context) {
    // Crear el contexto de audio después de un gesto de usuario
    context = new AudioContext();
  }

  // Inicializar el analizador
  if (!analyser) {
    // Crear un audio temporal para iniciar el analizador
    const tempAudio = new Audio();
    tempAudio.src = './audio/1.wav'; // Puedes poner cualquier archivo de audio aquí
    await initAnalyser(tempAudio);
  }
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
