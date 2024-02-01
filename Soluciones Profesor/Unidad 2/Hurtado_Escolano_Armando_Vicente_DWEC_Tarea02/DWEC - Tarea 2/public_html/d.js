// Obtenemos la fecha actual para contrastar con la fecha introducida.
let fechaActual = new Date();

let dia, mes, anio;

// Introducir día, mes y año.
dia = parseInt(prompt("Introduce el día:"));
mes = parseInt(prompt("Introduce el mes:")) - 1;
anio = parseInt(prompt("Introduce el año:"));

let fechaIntroducida = new Date(anio, mes, dia);

// Verificar si la fecha es válida.
if (
        fechaIntroducida.getFullYear() !== anio ||
        fechaIntroducida.getMonth() !== mes ||
        fechaIntroducida.getDate() !== dia ||
        isNaN(fechaIntroducida.getTime())
        ) {
    document.write("La fecha no es correcta.");
} else {

    // Calculamos la diferencia absoluta en milisegundos.
    let diferencia = Math.abs(fechaIntroducida - fechaActual);

    // Calculamos los días a partir de los milisegundos que nos resultan en la diferencia de fechas, redondeado hacia abajo.
    // (1000 milisegundos en un segundo (1000), por 60 segundos en un minuto (* 60), por 60 minutos en una hora (* 60), por 24 horas en un día (* 24).
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    // A partir de los días, calculamos semanas y años (no tenemos en cuenta bisiestos), redondeado hacia abajo.
    let semanas = Math.floor(dias / 7);
    let anios = Math.floor(dias / 365);

    document.write("La diferencia en días es: " + dias + "<br>La diferencia en semanas es: " + semanas + "<br>La diferencia en años es: " + anios);
}