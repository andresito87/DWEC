import Quokka from "./Quokka.js";

/**
 * Clase que representa un MafiaQuokka.
 * @property {string} nombre nombre del MafiaQuokka.
 * @property {int} edad edad del MafiaQuokka.
 * @property {string} zona zona de residencia del MafiaQuokka.
 * @throws {Error} El nombre tiene menos de tres letras.
 * @throws {Error} El nombre tiene mas de treinta letras.
 * @throws {Error} La edad no es un número entero.
 * @throws {Error} La edad no puede ser negativa.
 * @throws {Error} La edad no puede ser más de veinte años.
 * @throws {Error} Zona de residencia inválida
 * @version 1.0
 * @author Andrés Samuel Podadera González
 */
class MafiaQuokka extends Quokka {
  //Atributos privados
  /**
   * Edad del MafiaQuokka.
   * @property {int} _edad
   */
  #_edad;

  /**
   * Fotografía del MafiaQuokka
   * @property {string} _fotografia
   */
  #_fotografia;

  /**
   * Crea un MafiaQuokka.
   * @param {string} name Nombre del MafiaQuokka.
   * @param {int} edad Edad del MafiaQuokka
   * @param {string} zona Zona de resicencia del MafiaQuokka
   * @throws {Error} El nombre tiene menos de tres letras.
   * @throws {Error} El nombre tiene mas de treinta letras.
   * @throws {Error} La edad no es un número entero.
   * @throws {Error} La edad no puede ser negativa.
   * @throws {Error} La edad no puede ser más de veinte años.
   * @throws {Error} Zona de residencia inválida
   */
  constructor(nombre, edad, zona, fotografia) {
    super(nombre, edad, zona);
    this.#_edad = edad;
    this.#_fotografia = fotografia;
  }

  /**
   * GETTER: Obtiene la edad del MafiaQuokka.
   * @returns {string} Edad del MafiaQuokka.
   */
  get edad() {
    return this.#_edad;
  }

  /**
   * SETTER: Asigna valor a la edad del MafiaQuokka
   * @returns {void}
   * @param {string} edad Edad del MafiaQuokka.
   * @throws {Error} La edad no es un número entero.
   * @throws {Error} La edad no puede ser negativa.
   * @throws {Error} La edad no puede ser mayor de veinte años.
   */
  set edad(edad) {
    if (edad < 3) {
      throw new Error("La edad no puede ser menor a tres años.");
    } else if (edad > 10) {
      throw new Error("La edad no puede ser mayor de diez años.");
    }
    super.edad = edad;
  }

  /**
   * GETTER: Obtiene la fotografía del MafiaQuokka.
   * @returns {string} Fotografía del MafiaQuokka.
   */
  get fotografia() {
    return this.#_fotografia;
  }

  /**
   * SETTER: Asigna valor a la fotografia del MafiaQuokka
   * @returns {void}
   * @param {string} fotografia Fotografia del MafiaQuokka.
   * @info Si la fotografia elegida no existe, se asigna una foto por defecto
   * Valores posibles: "quokka1.jpeg","quokka2.jpeg","quokka3.jpeg","quokka4.jpeg",
   * "quokka5.jpeg","quokka6.jpeg","quokka7.jpeg","quokka8.jpeg"
   */
  set fotografia(fotografia) {
    if (
      fotografia !== "quokka1.jpeg" &&
      fotografia !== "quokka2.jpeg" &&
      fotografia !== "quokka3.jpeg" &&
      fotografia !== "quokka4.jpeg" &&
      fotografia !== "quokka5.jpeg" &&
      fotografia !== "quokka6.jpeg" &&
      fotografia !== "quokka7.jpeg" &&
      fotografia !== "quokka8.jpeg"
    ) {
      this.#_fotografia = "quokka1.jpeg";
    } else {
      this.#_fotografia = fotografia;
    }
  }

  /**
   * Representacion en String de un MafiaQuokka
   * @returns {string} MafiaQuokka representado en una frase
   */
  toString() {
    // Estilos en línea para la imagen
    const estilos =
      "width: 200px; height: auto; border-radius: 10px; vertical-align: middle;";
    return `<strong>${super.toString()} | Fotografía : </strong><img src="./img/${
      this.fotografia
    }" style="${estilos}" alt="MafiaQuokka">`;
  }
}

export default MafiaQuokka;
