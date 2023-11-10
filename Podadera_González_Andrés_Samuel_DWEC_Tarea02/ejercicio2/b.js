/*Ejercicio 2: Ejercicios de cadenas.*/

//Parte 1: Elimina el carácter elegido.
let frase = "";
let letra = "";
do {
    frase = prompt("Introduce una frase");
    letra = prompt("Introduce una letra");
} while (frase === "" || letra === "" || frase === null || letra === null);

const respuestaBorrarLetra = document.getElementsByClassName("borrarLetra");
let respuestaInvertirMayusMinus = document.getElementsByClassName("contarLetra");
//me aseguro que la frase no esté vacía si no contiene el carácter a borrar
let respuesta = frase;
//si la frase contiene el carácter a borrar, lo borro
if (frase.includes(letra)) {
    //tantas veces como se repita
    for (let i = 0; i < frase.length; i++) {
        if (frase.charAt(i) !== letra) {
            respuesta += frase.charAt(i);
        }
    }
}

respuestaBorrarLetra[0].innerHTML = `La frase "${frase}" sin la letra "${letra}" es: "${respuesta}".`;

//Parte 2: Invertir las mayúsculas y minúsculas solo en las posiciones múltiplos de un número entero dado.
const fraseAConvertir = prompt("Introduce una frase que desea convertir");
const numero = parseInt(prompt("Introduce un número"));
//Se puede realizar la validación de los datos introducidos con un bucle do-while
// pero como no se especifica en el enunciado, prefiero simplificar el código
// do {
//     fraseAConvertir = prompt("Introduce una frase que desea convertir");
//     numero = parseInt(prompt("Introduce un número"));
// } while (fraseAConvertir === "" || numero === "" || fraseAConvertir === null || numero === null);
respuestaInvertirMayusMinus = document.getElementsByClassName("invertirMayusMinus");
//validar que la frase no esté vacía y el número sea entero
if (!fraseAConvertir) {
    respuestaInvertirMayusMinus[0].innerHTML = `La frase no puede estar vacía`;
    throw new Error("La frase no puede estar vacía");
}
if (Number.isInteger(numero) === false) {
    respuestaInvertirMayusMinus[0].innerHTML = `El número introducido no es entero`;
    throw new Error("El número introducido no es entero");
}

let fraseConvertida = "";
//recorro la frase
for (let i = 0; i < fraseAConvertir.length; i++) {
    //si la posición es múltiplo del número introducido y la letra es mayúscula, la convierto en minúscula
    if ((i + 1) % numero === 0 && fraseAConvertir.charAt(i) === fraseAConvertir.charAt(i).toUpperCase()) {
        //concateno la letra convertida
        fraseConvertida += fraseAConvertir.charAt(i).toLowerCase();
        //si la posición es múltiplo del número introducido y la letra es minúscula, la convierto en mayúscula
    } else if ((i + 1) % numero === 0 && fraseAConvertir.charAt(i) === fraseAConvertir.charAt(i).toLowerCase()) {
        fraseConvertida += fraseAConvertir.charAt(i).toUpperCase();
        //si no es múltiplo, concateno la letra sin convertir
    } else {
        fraseConvertida += fraseAConvertir.charAt(i);
    }
}
//muestro la frase convertida
respuestaInvertirMayusMinus[0].innerHTML = `La frase "${fraseAConvertir}" convirtiendo mayúsculas y minúsculas es: "${fraseConvertida}".`;


