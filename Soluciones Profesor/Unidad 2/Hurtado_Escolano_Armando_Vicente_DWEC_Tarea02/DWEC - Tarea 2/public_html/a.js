let pregunta;

do {
    // Preguntar al usuario
    pregunta = prompt("¿Qué quieres que te adivine BrujIA?:");

    // Verificar si la entrada es null, ya que si apretamos cancelar el en el cuadro de diálogo, el programa acaba, por lo que emitimos un mensaje de despedida.
    if (pregunta === null) {
        document.write("<p><b>No has preguntado nada. ¡Adiós!</b></p>");
    } else {
        // Mostramos la pregunta del usuario
        document.write("<p>Tu pregunta es: " + pregunta + "</p>");

        // Si la pregunta incluye "DWEC" (mayúsculas o minúsculas) BrujIA se enfada y acaba el programa
        if (pregunta.toUpperCase().includes("DWEC")) {
            document.write("<p><b>A esas preguntas no respondo. ¡Adiós!</b></p>");
        } else {
            // BrujIA obtiene un número aleatorio
            document.write("<p>BrujIA lanza los dados...</p>");

            // Si el número es superior a 0.499999 la respuesta será positiva, con un número igual o inferior la respuesta será negativa.
            if (Math.random() > 0.499999) {
                document.write("<p>Y la respuesta es... <b>Sííííííííí</b></p>");
            } else {
                document.write("<p>Y la respuesta es... <b>Nooooooooo</b></p>");
            }
        }
    }
    document.write("<br><br>");

    // Realizar preguntas mientras la pregunta no incluya "DWEC" (mayúsculas o minúsculas)
} while (!pregunta.toUpperCase().includes("DWEC"));