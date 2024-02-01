function mostrarRespuestas(){
    let respuesta, pregunta;
    let salir = false; //Controlará cuando terminar con las preguntas

    do{
        pregunta = prompt("Introduzca su pregunta: ");
    
        //Si la pregunta contiene el texto dwec (mayúscula o minúscula) deja de hacer preguntas

        if(pregunta.toLowerCase().includes("dwec")){
            respuesta = "A esas preguntas no respondo. Adiós.";
            salir = true;
        }else{
            let aleatorio = Math.random(); //Genero un número aleatorio [0,1[
            if(aleatorio > 0.499999){
                respuesta = "Sí";
            }else{
                respuesta = "No";
            }
        }
        document.write("<p>Yo: "+pregunta+". BrujIA: "+respuesta+"<p/>");
    }while(!salir);
    
}