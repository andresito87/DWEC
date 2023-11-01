/*Ejercicio 1: Adivina el futuro.  brujIA.*/
/*En esta tarea vamos a crear un software adivinatorio brujIA que responda a nuestras preguntas.  Lo primero es que le hagamos una pregunta. A esa pregunta el software brujIA va a lanzar los dados. Si el número es superior a 0.499999 entonces la respuesta es sí. Si la pregunta contiene "DWEC" la brujIA se enfada.*/

const divRespuestas = document.getElementsByClassName("respuestas");
let pregunta = "";
let salir = false;
let numeroRandom;
do {
    pregunta = prompt("Lanza tu pregunta");
    numeroRandom = Math.random();
    if (pregunta.toLocaleLowerCase().includes("dwec")) {
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: A esas preguntas no respondo.Adiós.</p>`;
        salir = true;
    } else if (numeroRandom > 0.499999) {
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: Sí.</p>`;
    } else {
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: No.</p>`;
    }
} while (!salir);