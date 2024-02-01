function estaPantallaCompleta(){
    let pantalla = window.screen;
    let navegador = window.parent; //Cogemos la ventana donde está el iframe

    if(pantalla.width === navegador.innerWidth && pantalla.height === navegador.innerHeight){
        document.write("<p>El navegador está en pantalla completa</p>");
    } else{
        document.write("<p>El navegador no está en pantalla completa</p>");
    }
}
window.addEventListener('resize', manejarCambioDeTamaño);
function esMovil(){
    //Buscamos la palabra mobile dentro de userAgent para saber si el 
    //navegador web está siendo usado desde un móvil
    if(navigator.userAgent.toLowerCase().includes("mobile")){
        document.write("<p>Es un móvil</p>");
    }else{
        document.write("<p>No es un móvil</p>");
    }
}