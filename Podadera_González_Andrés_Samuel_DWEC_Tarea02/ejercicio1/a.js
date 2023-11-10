/*Ejercicio 1: Adivina el futuro.  brujIA.*/
/*En esta tarea vamos a crear un software adivinatorio brujIA que responda a nuestras preguntas.  Lo primero es que le hagamos una pregunta. A esa pregunta el software brujIA va a lanzar los dados. Si el número es superior a 0.499999 entonces la respuesta es sí. Si la pregunta contiene "DWEC" la brujIA se enfada.*/

//Guardo en una constante el div donde voy a mostrar las respuestas
const divRespuestas = document.getElementsByClassName("respuestas");
let pregunta = "";
let salir = false;
let numeroRandom;
do {
    //Preguntar al usuario
    pregunta = prompt("Lanza tu pregunta");
    //Genero un número aleatorio entre 0 y 1
    numeroRandom = Math.random();
    //Si la pregunta contiene la palabra "dwec"(en mayúsculas o minúsculas) la brujIA se enfada y sale del bucle
    if (pregunta.toLocaleLowerCase().includes("dwec")) {
        //Muestro la pregunta y la respuesta en el div
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: A esas preguntas no respondo.Adiós.</p>`;
        //Salida del bucle, acaba el programa
        salir = true;
        //Si el número aleatorio es superior a 0.499999 la brujIA responde sí
    } else if (numeroRandom > 0.499999) {
        //Muestro la pregunta y la respuesta en el div
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: Sí.</p>`;
        //Si el número aleatorio es inferior a 0.499999 la brujIA responde no
    } else {
        //Muestro la pregunta y la respuesta en el div
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: No.</p>`;
    }
} while (!salir);