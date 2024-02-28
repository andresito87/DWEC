//Elementos HTML
let elementos = {
  formulario: 'formulario',
  nombre: 'nombre',
  contrasena: 'contrasena',
  repetirContrasena: 'repetirContrasena',
  nacionalidad: 'nacionalidad',
  botonMostarContrasena: 'mostrarContrasena',
  imagenBotonMostarContrasena: 'imagenBotonMostrarContrasena',
  botonBorrar: 'borrar',
  errores: 'errores',
  resultado: 'resultado',
};

for (let key in elementos) {
  window[key] = document.getElementById(elementos[key]);
}

let arrayErrores = [];

/*es lo mismo que:
let formulario = document.getElementById('formulario');
let nombre = document.getElementById('nombre');
let contrasena = document.getElementById('contrasena');
let repetirContrasena = document.getElementById('repetirContrasena');
let nacionalidad = document.getElementById('nacionalidad');
let botonMostarContrasena = document.getElementById('mostrarContrasena');
let imagenBotonMostarContrasena = document.getElementById(
  'imagenBotonMostrarContrasena'
);
let botonBorrar = document.getElementById('reiniciar');
let errores = document.getElementById('errores');
let resultado = document.getElementById('resultado');*/

//OnFocus cambia el color del input
function cambiarColorInput(input) {
  if (input.classList.contains('focus')) {
    input.classList.remove('focus');
  } else {
    input.classList.add('focus');
  }
}

//Añadir color al input al hacer focus
nombre.addEventListener('focusin', () => cambiarColorInput(nombre));
contrasena.addEventListener('focusin', () => cambiarColorInput(contrasena));
repetirContrasena.addEventListener('focusin', () =>
  cambiarColorInput(repetirContrasena)
);

//Quitamos el color del input cuando pierde el foco
nombre.addEventListener('focusout', () => cambiarColorInput(nombre));
contrasena.addEventListener('focusout', () => cambiarColorInput(contrasena));
repetirContrasena.addEventListener('focusout', () =>
  cambiarColorInput(repetirContrasena)
);

//Mostrar contraseña y cambiar imagen de icono al hacer click en el boton
botonMostarContrasena.addEventListener('mousedown', e => {
  e.preventDefault();
  contrasena.type = 'text';
  repetirContrasena.type = 'text';
  imagenBotonMostarContrasena.src = '../assets/iconoOcultar.png';
});

//Mostrar contraseña y cambiar imagen del icono al despresionar el boton
botonMostarContrasena.addEventListener('mouseup', e => {
  e.preventDefault();
  contrasena.type = 'password';
  repetirContrasena.type = 'password';
  imagenBotonMostarContrasena.src = '../assets/iconoMostrar.png';
});

//Evitar que el boton haga submit
botonMostarContrasena.addEventListener('click', e => {
  e.preventDefault();
});

//Al hacer click se reinicia el formulario y se eliminan los estilos de los inputs
botonBorrar.addEventListener('click', e => {
  formulario.reset();
  //Elimino los estilos de los inputs
  document.querySelectorAll('input').forEach(input => {
    input.classList.remove('focus');
    input.classList.remove('valido');
    input.classList.remove('invalido');
  });
  //Elimino los mensajes de error y el resultado
  errores.innerHTML = '';
  resultado.innerHTML = '';
});

//validar nombre
function validarNombre() {
  //patron para validar el nombre: solo letras y vocales acentuadas, entre 10 y 25 caracteres
  let patron = /^[a-zA-ZñÑáéíóú]{10,25}$/;
  let resultadoFuncion = true;
  if (!patron.test(nombre.value.trim())) {
    arrayErrores.push(
      'El nombre solo puede contener letras y debe tener entre 10 y 25 caracteres'
    );
    if (!nombre.classList.contains('invalido')) {
      nombre.classList.add('invalido');
    }
    resultadoFuncion = false;
  } else {
    if (nombre.classList.contains('invalido')) {
      nombre.classList.remove('invalido');
    }
    nombre.classList.add('valido');
  }
  return resultadoFuncion;
}

//Validar contraseña
function validarContrasena() {
  let resultadoFuncion = true;
  /*patron para validar la contraseña:
  -Al menos 8 caracteres y maximo 21 (los dos ultimos el numero y el punto son obligatorios, no cuentan))
  -No puede empezar con ç, , o $
  -No puede contener select, where o ;
  -Debe contener al menos un numero y como maximo 3
  -Los numeros no tienen porque estar juntos
  */
  let patron =
    /^(?!ç|,|\$)(?!.*select|.*where |.*;)(?=(?:\D*\d){1,3}\D*$).{6,19}\d\.$/;
  if (!patron.test(contrasena.value)) {
    arrayErrores.push(
      'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.'
    );
    contrasena.classList.remove('valido');
    contrasena.classList.add('invalido');
    repetirContrasena.classList.remove('valido');
    repetirContrasena.classList.add('invalido');
    resultadoFuncion = false;
  } else if (contrasena.value !== repetirContrasena.value) {
    arrayErrores.push('Las contraseñas no coinciden.');
    contrasena.classList.remove('invalido');
    contrasena.classList.add('valido');
    repetirContrasena.classList.remove('valido');
    repetirContrasena.classList.add('invalido');
    resultadoFuncion = false;
  } else {
    contrasena.classList.remove('invalido');
    repetirContrasena.classList.remove('invalido');
    contrasena.classList.add('valido');
    repetirContrasena.classList.add('valido');
  }
  return resultadoFuncion;
}

//Validar nacionalidad(aunque sea un campo opcional, se valida por si se quiere hacer obligatorio en un futuro o no queremos que se envie un valor no valido)
function validarNacionalidad() {
  let arrayNacionalidades = Array.from(nacionalidad.options).map(
    option => option.value
  );
  let resultadoFuncion = true;
  if (!arrayNacionalidades.includes(nacionalidad.value)) {
    arrayErrores.push('La nacionalidad no es válida.');
    resultadoFuncion = false;
  }
  return resultadoFuncion;
}

//Validar formulario
formulario.addEventListener('submit', e => {
  //Evitar que el formulario se envie
  e.preventDefault();
  //Reiniciar el array de errores
  arrayErrores = [];
  //Reiniciar los mensajes de error y el resultado
  errores.innerHTML = '';
  resultado.innerHTML = '';
  if (validarNombre() & validarContrasena() & validarNacionalidad()) {
    resultado.innerHTML = `<span>Formulario Enviado Correctamente.</span><br>Nombre: ${nombre.value}<br>Contraseña: ${contrasena.value}<br>Nacionalidad: ${nacionalidad.value}`;
  } else {
    errores.innerHTML =
      (arrayErrores.length > 1
        ? `<span>ERRORES: </span>`
        : `<span>ERROR: </span>`) + arrayErrores.join('<br>');
  }
});

//LocalStorage
if (localStorage) {
  //Busco el div donde se muestra el contador de visitas
  let vecesVisitada = document.getElementById('vecesVisitada');
  if (localStorage.getItem('vecesVisitada') === null) {
    localStorage.setItem('vecesVisitada', 1);
    vecesVisitada.innerHTML =
      '&#x1F496 Has visitado esta página 1 vez &#x1F496';
  } else {
    let visitas = localStorage.getItem('vecesVisitada');
    //Actualizo el contador de visitas
    localStorage.setItem('vecesVisitada', parseInt(visitas) + 1);
    vecesVisitada.innerHTML = `&#x1F496 Has visitado esta página ${
      parseInt(visitas) + 1
    } veces &#x1F496`;
  }
}
