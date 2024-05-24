import Cancion from "./cancion.js";
class ListaReproduccion {
  #_nombre;
  #_canciones = [];

  constructor(nombre) {
    this.nombre = nombre;
  }

  get nombre() {
    return this.#_nombre;
  }

  set nombre(nuevoNombre) {
    if (typeof nuevoNombre != "string" || nuevoNombre == "") {
      throw new Error("Error en el nombre de la lista de reproduccion");
    }
    this.#_nombre = nuevoNombre;
  }

  get canciones() {
    let canciones = [...this.#_canciones];
    return canciones;
  }

  anadirCancion(cancion) {
    if (typeof cancion != typeof new Cancion("prueba", "prueba")) {
      throw new Error("Error, no has introducido una cancion");
    }
    this.#_canciones.push(cancion);
  }

  darMeGusta() {
    this.#_canciones.forEach((cancion) => cancion.darMeGusta());
  }

  obtenerCancionesPremium() {
    return this.#_canciones.filter((cancion) => cancion._esPremium === true);
  }

  ordenarCanciones() {
    this.#_canciones.sort(
      (cancion1, cancion2) => cancion1.numMeGusta() - cancion2.numMeGusta()
    );
  }

  obtenerPrimerasCanciones() {
    return this.#_canciones.slice(0, 2);
  }

  toString() {
    let stringCanciones = this.#_canciones.join("\n");
    return `Nombre: ${this.nombre}\nCanciones:\n${stringCanciones}`;
  }
}

export default ListaReproduccion;
