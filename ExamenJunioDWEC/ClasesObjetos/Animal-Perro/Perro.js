import { Animal } from './Animal.js';

export class Perro extends Animal {
  #raza;

  constructor(nombre, edad, raza) {
    super(nombre, edad); // Llama al constructor de la clase base (Animal)
    this.#raza = raza;
  }

  // Getter para raza
  get raza() {
    return this.#raza;
  }

  // Setter para raza
  set raza(nuevaRaza) {
    this.#raza = nuevaRaza;
  }

  ladrar() {
    return `${this.nombre} está ladrando.`;
  }

  toString() {
    return `${super.toString()} Es un ${this.#raza}.`;
  }
}
