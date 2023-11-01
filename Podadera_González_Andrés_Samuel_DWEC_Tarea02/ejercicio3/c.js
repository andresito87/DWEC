//Ejercicio 3:Vamos a trabajar con los objetos del navegador y vamos a averiguar si nuestro navegador tiene las siguientes propiedades u métodos.*/

const respuesta = document.getElementsByClassName("respuesta");

//Avisar por escrito si el navegador está en pantalla completa o no.

//TODO: Comprobar si el navegador está en pantalla completa o no.
console.log(window.screen.width, window.screen.height, window.screen.availWidth, window.screen.availHeight)
console.log(window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight)

//sólo funciona en firefox
if (window.screen.width == window.outerWidth && window.screen.height == (window.outerHeight)) {
    respuesta[0].innerHTML += "<br>Está en pantalla completa.";
}
else {
    respuesta[0].innerHTML += "<br>No está en pantalla completa.";
}

//Determinar si estamos visualizando la página en un dispositivo móvil o no.
let esMovil = false;
if (window.navigator.userAgent.match("Mobile")) {
    esMovil = true;
}

respuesta[0].innerHTML += `<br>${esMovil ? "Sí" : "No"} está en un dispositivo móvil.`;