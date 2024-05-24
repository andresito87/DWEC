class Cancion {
  #_titulo;
  #_artista;
  #_numMeGusta;
  #_esPremium;

  constructor(titulo, artista) {
    this.titulo = titulo;
    this.artista = artista;
    this.numMeGusta = 0;
    this.#_esPremium = false;
  }

  get titulo() {
    return this.#_titulo;
  }

  set titulo(nuevoTitulo) {
    if (typeof nuevoTitulo != "string" || nuevoTitulo == "") {
      throw new Error("Error en el titulo");
    }
    this.#_titulo = nuevoTitulo;
  }

  get artista() {
    return this.#_artista;
  }

  set artista(nuevoArtista) {
    if (typeof nuevoArtista != "string" || nuevoArtista == "") {
      throw new Error("Error en el nombre del artista");
    }
    this.#_artista = nuevoArtista;
  }

  get numMeGusta() {
    return this.#_numMeGusta;
  }

  set numMeGusta(nuevoNumMeGusta) {
    if (typeof nuevoNumMeGusta != "number") {
      throw new Error("Error en el numero de me gusta");
    }
    this.#_numMeGusta = nuevoNumMeGusta;
  }

  get esPremium() {
    return this.#_esPremium;
  }

  set esPremium(nuevoEsPremium) {
    if (typeof nuevoEsPremium != true && typeof nuevoEsPremium != false) {
      throw new Error("Error en el numero de me gusta");
    }
    this.#_esPremium = nuevoEsPremium;
  }

  darMegusta() {
    this.#_numMeGusta++;
  }

  toString() {
    return `Titulo: ${this.titulo} | Artista: ${this.artista}`;
  }
}
export default Cancion;
