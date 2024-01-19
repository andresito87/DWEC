/*4) Con SPLICE.

a) Haga la función elimina ( array , posición, longitud) que devuelve un array con la posición eliminada.*/

const ARRAYNUMEROS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function elimina(array, posicion, longitud) {
    let resultado = [...array]; //Hago una copia del array, no quiero modificar el original

    return resultado.splice(posicion, longitud);
}

console.log(elimina(ARRAYNUMEROS, 2, 1));
console.log(elimina(ARRAYNUMEROS, 5, 4));
console.log(elimina(ARRAYNUMEROS, 8, 100));

/*b)  Haga la función anada ( array , posición, caracter) que devuelve un array con la adición.*/

const ARRAYLETRAS = [];

function anada(array, posicion, caracter) {
    let resultado = "";
    if (!(caracter >= "a" && caracter <= "z" || caracter >= "A" && caracter <= "Z") || typeof caracter !== "string" || caracter.length !== 1) {
        resultado = "No has introducido una letra.";
    } else if (posicion < 1) {
        resultado = "No has introducido una posición válida.";
    } else {
        let contenidoDesplazado = array.splice(posicion - 1, array.length);
        array.push(caracter);
        contenidoDesplazado.map((elemento) => array.push(elemento));
    }
    return resultado === "" ? array : resultado;
}


console.log(anada(ARRAYLETRAS, 1, "a"));
console.log(anada(ARRAYLETRAS, 2, "b"));
console.log(anada(ARRAYLETRAS, 3, "c"));
console.log(anada(ARRAYLETRAS, 1, "d"));
console.log(anada(ARRAYLETRAS, 1, "e"));
console.log(anada(ARRAYLETRAS, 5, "f"));
console.log(anada(ARRAYLETRAS, 6, "12"));
console.log(anada(ARRAYLETRAS, 1, "a"));
console.log(anada(ARRAYLETRAS, 100, "x"));
