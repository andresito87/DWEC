//Declaración:
const MODOS_DE_JUEGO = ['Un Jugador', 'Dos Jugadores'];
let variable;

//Introducir información por teclado:
let cadena = prompt('Introduzca una cadena');

//Mostrar en pantalla:
document.write('</br> Texto </br>');
alert('Entrada no válida. El segundo número debe ser mayor que el primero.');
salida.innerHTML = '<br>Esto será mostrado en el navegador<br>';

//DOM:
let salida = document.getElementById('id');
salida.innerHTML = 'Texto que aparece en la página web';

//Consola:
console.log();
console.warn('¡Esto es un warning!');
console.error('¡ERROR!');

//Propiedades y métodos String/Char;
cadena.length;
cadena.toLowerCase();
cadena.toUpperCase();
cadena.charAt(i);
objeto.toString();
array.toString();

//Arrays:
entradas.push(c1, c2);
array.includes('elementoABuscar');
array.slice(posicionComienzo, PosicionFinal);
array.splice(posicionComienzo, cantidadDePosiciones, elementoSustituto);
array.forEach(elemento => console.log(elemento));
numeros.map(numero => numero ** 2);
palabras.filter(palabra => palabra.length > 6);
array.reduce(
  (acumulador, valorActual) => acumulador + valorActual,
  valorInicial
);
numeros.sort((a, b) => a - b);
numeros.sort(function (a, b) {
  return a - b;
});

//Conversiones:
dividendo = Number.parseFloat(prompt('Introduce el dividendo'));
anyo = Number.parseInt(anyo);
Number.parseFloat(numero);

//Validaciones:
isNaN(numero);
dividendo != null;
dividendo != '';
dividendo != undefined;
typeof nuevo_pais === 'string';
Number.isInteger();
cadena.trim();
//En clases que usan objetos de otras clases usar(operador instance of):
pauGasol instanceof JugadorBaloncesto;

//Bucles:
while (condicion) {
  //Procesamiento
}
// Entrada de datos
let nombre;
do {
  //Procesamiento
  nombre = prompt('Introduce tu nombre');
  edad = Number.parseInt(prompt('Introduce tu edad'));
} while (nombre == '' || edad < 0 || isNaN(edad));

for (let i = 0; i <= numeros.length; i++) {
  //procesamiento
}

for (const objeto of objetos) {
  console.log(objeto);
}

//Estructura condicional:
switch (color) {
  case 'rojo':
    resultado = 'Peligro';
    break;
  case 'amarillo':
    resultado = 'Advertencia';
    break;
  default:
    resultado = 'Texto por defecto';
}

//Objetos de Built-In:
Math.PI;
Math.pow(numero, exponente);
Math.random();
let hoy = new Date();
let fecha = new Date(anyo, mes - 1, dia);

//Objetos del navegador:
navigator.userAgent.toLowerCase().includes('mobile');
let pantalla = window.screen;
let navegador = window.parent;
pantalla.width === navegador.innerWidth;
pantalla.height === navegador.innerHeight;

//Clases:
class JugadorTenis extends Jugador {
  static #_LONGITUD_MAXIMA = 125; //Estática y constante
  #_nombre; //Privada

  constructor(nombre) {
    super(nombre);
    this.nombre = nombre;
  }

  get nombre() {
    return this.#_nombre;
  }

  set nombre(nuevo_nombre) {
    //Validación
  }

  toString() {
    //Genera String
  }
}
export default JugadorTenis;

//Módulos:
<script type="module">
  import ModuloImportado from './ArchivoDeLaClase.js'; //Uso del módulo
</script>;

//Excepciones:
throw new Error('Texto del error'); //Lanzo el error
try {
  //Recojo
  //creacion de objetos
  let objeto = new Objeto(valoresIniciales);
} catch (error) {
  console.error('Error' + error.message);
}
