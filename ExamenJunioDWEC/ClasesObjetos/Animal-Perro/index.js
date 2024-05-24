import { Animal } from './Animal.js';
import { Perro } from './Perro.js';

// Crear una instancia de Animal
let animal = new Animal('Lola', 5);
console.log(animal.toString()); // "Lola tiene 5 años."
animal.nombre = 'Luna';
animal.edad = 6;
console.log(animal.toString()); // "Luna tiene 6 años."

// Crear una instancia de Perro
let perro = new Perro('Max', 3, 'Labrador');
console.log(perro.toString()); // "Max tiene 3 años. Es un Labrador."
perro.nombre = 'Rocky';
perro.edad = 4;
perro.raza = 'Golden Retriever';
console.log(perro.toString()); // "Rocky tiene 4 años. Es un Golden Retriever."
console.log(perro.ladrar()); // "Rocky está ladrando."
