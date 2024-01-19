/*1) Ejercicios con MAP.

a) Duplicar cada elemento en un array

Por ejemplo con  const ARRAYNUMEROS = [1, 2, 3, 4, 5];*/

const ARRAYNUMEROS = [1, 2, 3, 4, 5];
console.log(ARRAYNUMEROS.map(numero => numero ** 2));

/*b)  Convertir cadenas de un a mayúsculas
Por ejemplo const MINUS = [ "hola,"adios","después" ];*/

const MINUS = ["hola", "adios", "después"];
console.log(MINUS.map(palabra => palabra.toLocaleUpperCase()));

/*c) sobre el anterior cálcule las diferente longitudes.*/

const MINUS2 = ["hola", "adios", "después"];
console.log(MINUS2.map(palabra => palabra.length))



