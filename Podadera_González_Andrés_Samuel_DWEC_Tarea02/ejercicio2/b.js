//Elimina el carácter elegido.
// const frase = prompt("Introduce una frase");
// const letra = prompt("Introduce una letra");
// const respuestaBorrarLetra = document.getElementsByClassName("borrarLetra");
// const respuestaInvertirMayusMinus = document.getElementsByClassName("contarLetra");
// let respuesta = "";
// console.log(frase);
// if (frase.includes(letra)) {
//     for (let i = 0; i < frase.length; i++) {
//         if (frase.charAt(i) !== letra) {
//             respuesta += frase.charAt(i);
//         }
//     }
// }

// respuestaBorrarLetra[0].innerHTML = `La frase "${frase}" sin la letra "${letra}" es: "${respuesta}".`;

//Invertir las mayúsculas y minúsculas solo en las posiciones múltiplos de un número entero dado.
const fraseAConvertir = prompt("Introduce una frase que desea convertir");
const numero = parseInt(prompt("Introduce un número"));
const respuestaInvertirMayusMinus = document.getElementsByClassName("invertirMayusMinus");
//validar que la frase no esté vacía y el número sea entero
if (fraseAConvertir === "") {
    respuestaInvertirMayusMinus[0].innerHTML = `La frase no puede estar vacía`;
    throw new Error("La frase no puede estar vacía");
}
if (Number.isInteger(numero) === false) {
    respuestaInvertirMayusMinus[0].innerHTML = `El número introducido no es entero`;
    throw new Error("El número introducido no es entero");
}

let fraseConvertida = "";
for (let i = 0; i < fraseAConvertir.length; i++) {
    console.log(fraseAConvertir);
    if ((i + 1) % numero === 0 && fraseAConvertir.charAt(i) === fraseAConvertir.charAt(i).toUpperCase()) {
        fraseConvertida += fraseAConvertir.charAt(i).toLowerCase();
    } else if ((i + 1) % numero === 0 && fraseAConvertir.charAt(i) === fraseAConvertir.charAt(i).toLowerCase()) {
        fraseConvertida += fraseAConvertir.charAt(i).toUpperCase();
    } else {
        fraseConvertida += fraseAConvertir.charAt(i);
    }
}

respuestaInvertirMayusMinus[0].innerHTML = `La frase "${fraseAConvertir}" convirtiendo mayúsculas y minúsculas es: "${fraseConvertida}".`;


