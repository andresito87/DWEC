//creacion de la lista de sonidos
let sonidos = [];
for (let i = 1; i <= 25; i++) {
  sonidos.push(`./audio/${i}.wav`);
}
//creación del botón inicio
let body = document.querySelector('body');
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
  crearTablero();
  crearZonaInformativa();
  crearBotonesControl();
  body.appendChild(divContenedor);
  body.appendChild(botonesControl);
});

function crearTablero() {
  let tablero = document.createElement('div');
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
        audio.play();
      });
      tablero.appendChild(casilla);
    }
  }
  divContenedor.appendChild(tablero);
}

function crearZonaInformativa() {
  let zonaInformativa = document.createElement('div');
  zonaInformativa.classList.add('zonaInformativa');
  let texto = document.createElement('p');
  texto.textContent = 'Pulsa en los números que quieras tachar';
  zonaInformativa.appendChild(texto);
  divContenedor.appendChild(zonaInformativa);
}

function crearBotonesControl() {
  let botonReiniciar = document.createElement('button');
  botonReiniciar.classList.add('boton');
  botonReiniciar.textContent = 'Borrar';
  botonReiniciar.addEventListener('mousedown', () => {
    let casillas = document.querySelectorAll('.casilla');
    casillas.forEach(casilla => {
      casilla.classList.remove('casillaPulsada');
    });
  });
  botonesControl.appendChild(botonReiniciar);
  let botonReproducir = document.createElement('button');
  botonReproducir.classList.add('boton');
  botonReproducir.textContent = 'Reproducir';
  botonReproducir.addEventListener('mousedown', () => {
    let casillas = document.querySelectorAll('.casilla');
    casillas.forEach(casilla => {
      casilla.classList.add('casillaPulsada');
    });
  });
  botonesControl.appendChild(botonReproducir);
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
