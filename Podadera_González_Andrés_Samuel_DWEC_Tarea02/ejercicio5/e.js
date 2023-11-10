/*Ejercicio 5: Cálculo del área  de un casquete esférico. 
Comprobar la entrada de datos con lo visto hasta ahora en el curso (o sea, sin expresiones regulares todavía).
Podéis usar las entradas (números flotantes), R y h, o a y h. Una vez decidido elige las fórmulas que vas a utilizar.
El área de un casquete esférico es: A = 2πRh = π*(a^2+h^2)
El volumen de un casquete esférico es: V = πh^2/3*(3R-h)= πh/6*(3a^2+h^2)
*/

let radio;
let altura;
//Guardar el div donde se mostrará la respuesta
let divRespuesta = document.getElementsByClassName("respuestas");

//Pedir los datos al usuario, si introduce un valor de radio o altura incorrectos, vuelvo a pedirlo, hasta que introduzca un valor correcto
do {
    if (radio <= 0 || isNaN(radio)) {
        radio = prompt("Introduce el radio de la esfera");
    }
    if (altura <= 0 || isNaN(altura)) {
        altura = prompt("Introduce la altura del casquete");
    }
} while ((radio <= 0 || altura <= 0) || isNaN(radio) || isNaN(altura));

if (isNaN(radio) || isNaN(altura) || radio === null || altura === null || radio === "" || altura === "") {
    divRespuesta[0].innerHTML = `Los datos introducidos no son correctos.`;
} else {
    let area = 2 * Math.PI * radio * altura;
    let volumen = Math.PI * Math.pow(altura, 2) / 3 * (3 * radio - altura);

    divRespuesta[0].innerHTML = `Para un casquete esférico con altura de: ${altura} y radio de : ${radio}, su área es: ${area.toFixed(2)} y su volumen es: ${volumen.toFixed(2)}.`;
}