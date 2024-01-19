/*2) Ejercicios con FILTER.

a) de un array de números muestre los números impares.*/
const ARRAYNUMEROS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(ARRAYNUMEROS.filter(numero => numero % 2 == 0));

/*b) cree una función que muestre,  de un array con cadenas,  las que contengan la letra que se le pase como argumento (no te olvides de comprobar que solo sea un a letra).*/

const ARRAYPALABRAS = ["hola", "adios", "después", "pronto", "tarde", "nunca", "siempre"];
function comprobarIncluyeLetraEn(array, letra) {
    let resultado = "";
    if (!(letra >= "a" && letra <= "z" || letra >= "A" && letra <= "Z") || typeof letra !== "string" || letra.length !== 1) {
        resultado = "No has introducido una letra.";
    } else {
        resultado = array.filter(palabra => palabra.split('').includes(letra));
    }
    return resultado.length === 0 ? `No hay palabras con la letra ${letra}.` : resultado;
}

console.log(comprobarIncluyeLetraEn(ARRAYPALABRAS, "u"));
console.log(comprobarIncluyeLetraEn(ARRAYPALABRAS, "a"));
console.log(comprobarIncluyeLetraEn(ARRAYPALABRAS, "c"));
console.log(comprobarIncluyeLetraEn(ARRAYPALABRAS, "y"));
console.log(comprobarIncluyeLetraEn(ARRAYPALABRAS, "11"));

/*c)  Filtrar elementos de un array y modificarlos. Para ello vamos a usar un filter. Primero vamos a hacer que se seleccione los números pares y luego los vamos a dividir por dos.*/

const ARRAYNUMEROS2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(ARRAYNUMEROS2.filter(numero => numero % 2 == 0).map(numero => numero / 2));