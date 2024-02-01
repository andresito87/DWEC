/**
 * Clase que representa un Quokka.
 * @property {string} nombre nombre del Quokka.
 * @property {int} edad edad del Quokka.
 * @property {string} zona zona de residencia del Quokka.
 * @throws {Error} El nombre tiene menos de tres letras.
 * @throws {Error} El nombre tiene mas de treinta letras.
 * @throws {Error} La edad no es un número entero.
 * @throws {Error} La edad no puede ser negativa.
 * @throws {Error} La edad no puede ser mayor de veinte años.
 * @throws {Error} Zona de residencia inválida
 * @version 1.0
 * @author Andrés Samuel Podadera González
 */
class Quokka {
  //Atributos privados
  /**
   * Nombre del Quokka.
   * @property {string} _nombre
   */
  #_nombre;

  /**
   * Edad del Quokka.
   * @property {int} _edad
   */
  #_edad;

  /**
   * Zona de residencia del Quokka
   * @property {string} _zona
   */
  #_zona;

  /**
   * Crea un Quokka.
   * @param {string} name Nombre del Quokka.
   * @param {int} edad Edad del Quokka
   * @param {string} zona Zona de resicencia del Quokka
   * @throws {Error} El nombre tiene menos de tres letras.
   * @throws {Error} El nombre tiene mas de treinta letras.
   * @throws {Error} La edad no es un número entero.
   * @throws {Error} La edad no puede ser negativa.
   * @throws {Error} La edad no puede ser mayor de veinte años.
   * @throws {Error} Zona de residencia inválida
   */
  constructor(nombre, edad, zona) {
    this.nombre = nombre;
    this.edad = edad;
    this.zona = zona;
  }

  /**
   * GETTER: Obtiene el nombre del Quokka.
   * @returns {string} Nombre del Quokka.
   */
  get nombre() {
    return this.#_nombre;
  }

  /**
   * SETTER: Asigna valor al nombre del Quokka.
   * @returns {void}
   * @param {string} nombre Nombre del Quokka.
   * @throws {Error} El nombre tiene menos de tres letras.
   * @throws {Error} El nombre tiene más de treinta letras.
   */
  set nombre(nombre) {
    if (nombre.trim().length < 3) {
      throw new Error("El nombre tiene menos de tres letras.");
    } else if (nombre.trim().length > 30) {
      throw new Error("El nombre tiene más de treinta letras.");
    }
    this.#_nombre = nombre;
  }

  /**
   * GETTER: Obtiene la edad del Quokka.
   * @returns {string} Edad del Quokka.
   */
  get edad() {
    return this.#_edad;
  }

  /**
   * SETTER: Asigna valor a la edad del Quokka
   * @returns {void}
   * @param {string} edad Edad del Quokka.
   * @throws {Error} La edad no es un número entero.
   * @throws {Error} La edad no puede ser negativa.
   * @throws {Error} La edad no puede ser mayor de veinte años.
   */
  set edad(edad) {
    if (!Number.isInteger(edad)) {
      throw new Error("La edad no es un número entero.");
    }
    if (edad < 0) {
      throw new Error("La edad no puede ser negativa.");
    } else if (edad > 20) {
      throw new Error("La edad no puede ser mayor de veinte años.");
    }
    this.#_edad = edad;
  }

  /**
   * GETTER: Obtiene la zona de residencia del Quokka.
   * @returns {string} Zona de residencia del Quokka.
   */
  get zona() {
    return this.#_zona;
  }

  /**
   * SETTER: Asigna valor a la zona de residencia del Quokka.
   * @returns {void}
   * @param {string} zona zona de residencia del Quokka.
   * @throws {Error} Zona de residencia inválida
   */
  set zona(zona) {
    if (zona !== "Rottnest" && zona !== "Bald") {
      throw new Error(`${zona}: Zona de residencia inválida.`);
    }
    this.#_zona = zona;
  }

  /**
   * Representacion del comportamiento de un Quokka al hablar
   * @returns {string} representación del sonido de un Quokka al hablar
   */
  hablar() {
    return "¡¡¡¡GRRRR... FSSS...!!!!";
  }

  /**
   * Representacion en String de un Quokka
   * @returns {string} Quokka representado en una frase
   */
  toString() {
    return `Nombre: ${this.nombre} | Edad: ${this.edad} años | Zona: ${this.zona}`;
  }
}

export default Quokka;
