// Solicitar al usuario que ingrese el radio (R) y la altura (h).
let radio = parseFloat(prompt("Ingresa el radio (R) de la esfera:"));
let altura = parseFloat(prompt("Ingresa la altura (h) del casquete esférico:"));

// Verificar si las entradas son números válidos.
if (isNaN(radio) || isNaN(altura) || radio < 0 || altura < 0) {
    document.write("<p>Por favor, ingresa números válidos.</p>");
} else {
    // Calcular el área y el volumen del casquete esférico.
    let area = 2 * Math.PI * radio * altura;
    let volumen = (Math.PI * Math.pow(altura, 2) * (3 * radio - altura)) / 3;

    document.write("<p>El área del casquete esférico es: " + area.toFixed(2) + "</p>");
    document.write("<p>El volumen del casquete esférico es: " + volumen.toFixed(2) + "</p>");
}