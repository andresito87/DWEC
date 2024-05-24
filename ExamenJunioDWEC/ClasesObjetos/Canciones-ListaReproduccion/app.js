import Cancion from "./cancion.js";
import ListaReproduccion from "./listaReproduccion.js";

function anadirCanciones(listaReproduccion) {
  let cancion1;
  let cancion2;
  let cancion3;
  let cancion4;
  let cancion5;
  try {
    cancion1 = new Cancion("First Light", "Yao Chen");
    cancion1._esPremium = true;
    cancion2 = new Cancion("Lekko", "Marcin Starosta");
    cancion2._esPremium = true;
    cancion3 = new Cancion("A Long GoodBye", "The Magic Lantern");
    cancion3.darMegusta();
    cancion4 = new Cancion("Alt Jeg", "Alise Lindahl");
    cancion4.numMeGusta = 2;
    cancion5 = new Cancion("De Seu", "Mirta da Silva");
    cancion5.numMeGusta = 3;
    listaReproduccion.anadirCancion(cancion1);
    listaReproduccion.anadirCancion(cancion2);
    listaReproduccion.anadirCancion(cancion3);
    listaReproduccion.anadirCancion(cancion4);
    listaReproduccion.anadirCancion(cancion5);
  } catch (error) {
    console.error("Error" + error.message);
  }
}

let miListaReproduccion;
try {
  miListaReproduccion = new ListaReproduccion("Wake Up Gently");
  anadirCanciones(miListaReproduccion);
  console.log(miListaReproduccion.toString());
} catch (error) {
  console.error("Error" + error.message);
}

function obtenerListaHTML(canciones) {
  let resultado = "";
  for (let cancion of canciones) {
    resultado += `<li>
  <div>
  <h3>Título:${cancion.titulo}</h3>
  <p>Artista:${cancion.artista}</p>
  <p>Número de "Me gusta":${cancion.numMeGusta}</p>
  </div>
  <p ${cancion.esPremium ? 'class="premium"' : ""}>Premium:${
      cancion.esPremium ? "Sí" : "No"
    }</p>
  </li>\n`;
  }
  return resultado;
}

console.log(obtenerListaHTML(miListaReproduccion.canciones));

let tituloLista = document.getElementById("nombre-lista");
tituloLista.innerHTML = miListaReproduccion.nombre;

let cancionesOriginales = document.getElementById("canciones-originales");
cancionesOriginales.innerHTML = obtenerListaHTML(miListaReproduccion.canciones);

let cancionesPremium = document.getElementById("canciones-premium");
cancionesPremium.innerHTML = obtenerListaHTML(
  miListaReproduccion.obtenerCancionesPremium()
);

for (let cancion of miListaReproduccion.canciones) {
  cancion.darMegusta();
}

let cancionesMegusta = document.getElementById("canciones-aumento-megusta");
cancionesMegusta.innerHTML = obtenerListaHTML(miListaReproduccion.canciones);
