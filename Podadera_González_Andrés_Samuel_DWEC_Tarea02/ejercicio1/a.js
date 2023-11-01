const divRespuestas = document.getElementsByClassName("respuestas");
let pregunta = "";
do {
    pregunta = prompt("Lanza tu pregunta");
    const numeroRandom = Math.random();
    if (numeroRandom < 0.499999) {
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: Sí.</p>`;
    } else {
        divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: No.</p>`;
    }
} while (!pregunta.includes("DWEC"));

divRespuestas[0].innerHTML += `<p>Yo: ${pregunta}.brujIA: A esas preguntas no respondo.Adiós.</p>`;