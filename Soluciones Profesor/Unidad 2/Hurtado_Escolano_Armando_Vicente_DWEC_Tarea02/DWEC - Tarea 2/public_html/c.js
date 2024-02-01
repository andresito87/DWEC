// Avisar por escrito si el navegador está en pantalla completa o no.

// Comparamos el tamaño de la ventana con el tamaño de la pantalla.
if (window.innerWidth === screen.width && window.innerHeight === screen.height) {
    document.write("El navegador está en pantalla completa.");
} else {
    document.write("El navegador no está en pantalla completa.");
}

document.write("<br><br>");

// Detectar si estás en un móvil o no.

// Verificamos si 'Mobi' o 'Android' están en userAgent.
if (navigator.userAgent.includes("Mobi") || navigator.userAgent.includes("Android")) {
    document.write("Estás en un dispositivo móvil.");
} else {
    document.write("No estás en un dispositivo móvil.");
}