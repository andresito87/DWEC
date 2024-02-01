function calcularArea(h, R){
    return 2*Math.PI*R*h;  
}
function calcularVolumen(h, R){
   return (Math.PI*Math.pow(h,2))/3*(3*R-h);
}
function pedirDato(dato){
    let n; 
    //Debe ser un número positivo que puede ser decimal 
    do{
        n = prompt("Introduce "+dato+": ");
        n = parseFloat(n);

        if(isNaN(n) || n < 0){
            alert("Dato incorrecto");
        }
    }while(isNaN(n) || n < 0);
    return n;
}
function calcularAreaVolumen(){
    let h = pedirDato("la altura");
    let R = pedirDato("el radio");

    document.write("<p>Área: " + calcularArea(h, R)+"</p>");
    document.write("<p>Volumen: " + calcularVolumen(h, R)+"</p>");


}