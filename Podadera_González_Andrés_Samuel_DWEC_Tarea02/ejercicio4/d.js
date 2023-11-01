/*Ejercicio 4:Calcule el número de días, semanas y años desde el día de hoy hasta una fecha introducida por teclado. Usad el objeto Date para el cálculo. La fecha se puede meter por separado (primero día, luego mes y luego año) o junta (indica el formato de fecha esperado en el prompt.*/

//Pruebas
//const fechaUsuario = new Date(2024, 10, 1); //Falta
//const fechaUsuario = new Date(2025, 9, 3); //Faltan
//const fechaUsuario = new Date(2023, 9, 31); //Ha
//const fechaUsuario = new Date(2023, 9, 1); //Han

const fechaUsuario = new Date(prompt("Introduce una fecha en formato dd/mm/aaaa"));

const divRespuestas = document.getElementsByClassName("respuestas");
const fechaActual = new Date();
let diferenciaEntreFechas = 0;
if (fechaUsuario > fechaActual) {
    diferenciaEntreFechas = fechaUsuario - fechaActual;
    esMayorFechaActual = false;
} else {
    diferenciaEntreFechas = fechaActual - fechaUsuario;
    esMayorFechaActual = true;
}

let años = Math.floor(diferenciaEntreFechas / (1000 * 60 * 60 * 24 * 365));
let semanasRestantes = diferenciaEntreFechas % (1000 * 60 * 60 * 24 * 365);
let semanas = Math.floor(semanasRestantes / (1000 * 60 * 60 * 24 * 7));
let diasRestantes = semanasRestantes % (1000 * 60 * 60 * 24 * 7);
let dias = Math.floor(diasRestantes / (1000 * 60 * 60 * 24));

let respuesta = "";
if (fechaUsuario.toLocaleDateString("es-ES") === fechaActual.toLocaleDateString("es-ES")) {
    respuesta = "Has introducido la fecha de hoy.";
} else {
    respuesta += esMayorFechaActual ? "Ha" : "Falta";
    respuesta += (años > 0 && semanas > 0) || (años > 0 && dias > 0) || ((semanas > 0 && dias > 0)) ? "n " : " ";
    respuesta += esMayorFechaActual > 0 ? "pasado " : "";
    respuesta += años > 0 ? `${años} año` : "";
    respuesta += años > 1 ? `s` : "";
    respuesta += (años > 0 && semanas > 0 && dias > 0) ? `, ` : "";
    respuesta += (años > 0 && semanas > 0 && dias === 0) ? ` y ` : "";
    respuesta += semanas > 0 ? `${semanas} semana` : "";
    respuesta += semanas > 1 ? `s` : "";
    respuesta += semanas > 0 && dias > 0 ? ` y ` : "";
    respuesta += dias > 0 ? `${dias} día` : "";
    respuesta += dias > 1 ? `s` : "";
    respuesta += esMayorFechaActual ? ` desde la fecha introducida ${fechaUsuario.toLocaleDateString("es-ES")}` : ` para que llegue la fecha introducida ${fechaUsuario.toLocaleDateString("es-ES")}`;
}

divRespuestas[0].innerHTML = respuesta;


