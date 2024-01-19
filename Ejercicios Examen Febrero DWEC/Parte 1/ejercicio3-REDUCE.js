/*3) Con REDUCE

a) Sumar todos los elementos de un array numérico.*/
const ARRAYNUMEROS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(ARRAYNUMEROS.reduce((acc, number) => acc + number));

/*b) Concatenar todos los elementos de un array.*/
const ARRAYPALABRAS = ["Desarrollo", "Web", "en", "Entorno", "Cliente"];
console.log(ARRAYPALABRAS.reduce((acc, palabra) => acc + " " + palabra));


/*c) Multiplica todos los elmentos de un array.*/
const ARRAYNUMEROS2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(ARRAYNUMEROS2.reduce((acc, numero) => acc * numero));


