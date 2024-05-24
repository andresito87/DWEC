export class Animal {
  #nombre;
  #edad;

  constructor(nombre, edad) {
    this.#nombre = nombre;
    this.#edad = edad;
  }

  // Getter para nombre
  get nombre() {
    return this.#nombre;
  }

  // Setter para nombre
  set nombre(nuevoNombre) {
    this.#nombre = nuevoNombre;
  }

  // Getter para edad
  get edad() {
    return this.#edad;
  }

  // Setter para edad
  set edad(nuevaEdad) {
    this.#edad = nuevaEdad;
  }

  toString() {
    return `${this.#nombre} tiene ${this.#edad} años.`;
  }
}
