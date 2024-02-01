function sustituir(){
    let cadena = prompt("Introduce una cadena");
    let caracter;

    //Pedirá que introduzca un caracter
    do{
        caracter = prompt("Introduce un caracter");
        
        if(caracter.length != 1){
            alert("Debes introducir solo un caracter");
        }
    }while(caracter.length != 1);

    //Creará una nueva cadena con las caracteres de la cadena original
    //que no sean el caracter introducido
    //Lo he implementado para que sea sensible a mayúsculas y minúsculas
    //No es lo mismo si introduce que sustituya la e que la E
    //Se podría modificar e incluir un toLowerCase o toUpperCase
    //Si se quisiera cambiar este funcionamiento
    let cadenaReplace = "";
    for (let i = 0; i < cadena.length; i++) {
        let c = cadena.charAt(i);
        if(c !== caracter){
            cadenaReplace += c;
        }
    }
    document.write("<p>La cadena original es: "+cadena+"</p>");
    document.write("<p>Si eliminamos el caracter: "+caracter+"</p>");
    document.write("<p>Obtenemos la cadena: "+cadenaReplace+"</p>");

}
function invertir(){
    let cadena = prompt("Introduce una cadena");
    let multiplo;

    //El múltiplo debe ser un número válido mayor de 1
    do{
        multiplo = prompt("Introduce un múltiplo");
        multiplo = parseInt(multiplo);
        if(isNaN(multiplo) || multiplo < 1){
            alert("Debes introducir un número válido");
        }
    }while(isNaN(multiplo) || multiplo < 1);


    let cadenaInvertida = "";
    //Hay que controlar que la posición para el usuario comienza en 1
    //y para el ordenador en 0
    for (let i = 1; i <= cadena.length; i++) {
        let c = cadena.charAt(i-1);
        if(i%multiplo == 0){
            if(c >= 'A' && c <= 'Z'){
                cadenaInvertida += c.toLowerCase();
            }else if(c >= 'a' && c <= 'z'){
                cadenaInvertida += c.toUpperCase();
            }else{
                cadenaInvertida += c;
            }
        }else{
            cadenaInvertida += c;
        } 
    }
    document.write("<p>La cadena original es: "+cadena+"</p>");
    document.write("<p>La cadena con las mayúsculas/minúsculas invertida es: "+cadenaInvertida+"</p>");
}