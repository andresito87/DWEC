// Eliminar el carácter elegido.

// Se va van a pedir tanto la cadena como el caracter a eliminar.
let cadenaEliminar = prompt("Introduce una cadena para eliminar un carácter: ");
let caracterEliminar = prompt("Introduce el carácter a eliminar: ");

document.write("<b>Eliminación del caracter elegido</b><br>");

// Control para evitar la introducción de cadena vacía.
if (!cadenaEliminar || !caracterEliminar) {
    document.write("No introduzca una cadena vacía<br>")
} else {
    // Con la ayuda de un bucle for, vamos a ir formando la nueva cadena caracter a caracter, con la excepción del caracter elegido para eliminar
    let nuevaCadenaEliminar = "";
    for (let i = 0; i < cadenaEliminar.length; i++) {
        if (cadenaEliminar.charAt(i) !== caracterEliminar) {
            nuevaCadenaEliminar += cadenaEliminar.charAt(i);
        }
    }

    document.write("Cadena introducida: " + cadenaEliminar + "<br>");
    document.write("Cadena resultante al eliminar el carácter " + caracterEliminar + ": " + nuevaCadenaEliminar + "<br>");
}
document.write("<br>");

// Invertir las mayúsculas y minúsculas solo en las posiciones múltiplos de un número entero dado.

// Se pide tanto la cadena como el número en cuyos múltiplos se invertirá el caracter.
let cadenaInvertir = prompt("Introduce una cadena para invertir mayúsculas y minúsculas: ");
let multiploInvertir = parseInt(prompt("Introduce el número cuyos múltiplos se invertirán: "));

document.write("<b>Inversión de mayúsculas y minúsculas</b><br>");

// Control para evitar la introducción de cadena vacía, .
if (!cadenaInvertir) {
    document.write("No introduzca una cadena vacía");

    // Control para evitar la introducción de dato que no sea número, o números no positivos.
} else if (isNaN(multiploInvertir) || multiploInvertir <= 0) {
    document.write("Introduzca un número positivo");
} else {
    // Con la ayuda de un bucle for, verificando si son múltiplos del número dado en la entrada, formaremos la nueva cadena, comprobando en aquellas posiciones que sean múltiplos si son mayúsculas o minusculas, y haciendo la inversión.
    let nuevaCadenaInvertir = "";
    for (let i = 0; i < cadenaInvertir.length; i++) {
        if ((i + 1) % multiploInvertir === 0) {
            if (cadenaInvertir.charAt(i) === cadenaInvertir.charAt(i).toUpperCase()) {
                nuevaCadenaInvertir += cadenaInvertir.charAt(i).toLowerCase();
            } else {
                nuevaCadenaInvertir += cadenaInvertir.charAt(i).toUpperCase();
            }
        } else {
            nuevaCadenaInvertir += cadenaInvertir.charAt(i);
        }
    }

    document.write("Cadena introducida: " + cadenaInvertir + "<br>");
    document.write("Cadena resultante al invertir mayúsculas y minúsculas en los múltiplos de " + multiploInvertir + ": " + nuevaCadenaInvertir);
}