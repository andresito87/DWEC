const divRespuestas = document.getElementsByClassName("respuestas");
let pregunta = "";
let salir = false;
do {
    pregunta = prompt("Lanza tu pregunta");
    const numeroRandom = Math.random();
    if (pregunta.includes("DWEC")) {
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: A esas preguntas no respondo.Adiós.</p>`;
        salir = true;
    } else if (numeroRandom < 0.499999) {
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: Sí.</p>`;
    } else {
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: No.</p>`;
    }
} while (!salir);