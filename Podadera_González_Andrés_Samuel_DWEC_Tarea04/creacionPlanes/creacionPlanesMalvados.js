//Elementos del HTML
let elementos = {
  formulario: 'formulario',
  nombrePlan: 'nombrePlan',
  codigoPlan: 'codigoPlan',
  tipoPlan: 'tipoPlan',
  pais: 'pais',
  botonBorrar: 'borrar',
  errores: 'errores',
  resultado: 'resultado',
};

for (let key in elementos) {
  window[key] = document.getElementById(elementos[key]);
}

//OnFocus cambia el color del input
function cambiarColorInput(input) {
  if (input.classList.contains('focus')) {
    input.classList.remove('focus');
  } else {
    input.classList.add('focus');
  }
}

//Añadir eventos de adquirir el foco
nombrePlan.addEventListener('focusin', () => cambiarColorInput(nombrePlan));
codigoPlan.addEventListener('focusin', () => cambiarColorInput(codigoPlan));
pais.addEventListener('focusin', () => cambiarColorInput(pais));

//Añadir eventos de perder el foco
nombrePlan.addEventListener('focusout', () => cambiarColorInput(nombrePlan));
codigoPlan.addEventListener('focusout', () => cambiarColorInput(codigoPlan));
pais.addEventListener('focusout', () => cambiarColorInput(pais));

//Conversion del nombre a mayusculas cuando se escribe
nombrePlan.addEventListener('input', () => {
  nombrePlan.value = nombrePlan.value.toUpperCase();
});

//Funcion para obtener el valor del tipo de plan seleccionado
function obtenerValorTipoPlanSeleccionado() {
  opcionesTipoPlan = document.getElementsByName('tipoPlan');
  let tipoSeleccionado = '';
  for (let i = 0; i < opcionesTipoPlan.length; i++) {
    if (opcionesTipoPlan[i].checked) {
      tipoSeleccionado = opcionesTipoPlan[i].value;
    }
  }
  return tipoSeleccionado;
}

//Funcion para obtener el elemento input seleccionado en el campo tipo de plan
function obtenerElementoInputTipoPlanSeleccionado() {
  opcionesTipoPlan = document.getElementsByName('tipoPlan');
  for (let i = 0; i < opcionesTipoPlan.length; i++) {
    if (opcionesTipoPlan[i].checked) {
      return opcionesTipoPlan[i];
    }
  }
}

//Resultado de enviar el formulario
formulario.addEventListener('submit', e => {
  e.preventDefault();

  //Usamos la funcion para obtener el valor del tipo de plan seleccionado
  let tipoSeleccionado = obtenerValorTipoPlanSeleccionado();

  //Aunque este formulario se valida con HTML5, se añade una validacion con la API de validacion de formularios de JavaScript checkValidity() y añado estilos a los campos validados
  if (nombrePlan.checkValidity()) {
    nombrePlan.classList.add('valido');
  }
  if (codigoPlan.checkValidity()) {
    codigoPlan.classList.add('valido');
  }
  if (tipoSeleccionado !== '') {
    //busco el input del tipo de plan seleccionado, accedo a su padre div y le añado un borde verde
    obtenerElementoInputTipoPlanSeleccionado().parentNode.classList.add(
      'bordeValido'
    );
  } else {
    errores.innerHTML = 'No has seleccionado un tipo de plan';
  }
  //El campo pais no es obligatorio, por lo que no se valida, pero si se ha seleccionado un pais, se marca como valido
  if (pais.value !== '') {
    pais.classList.add('valido');
  } else {
    pais.classList.remove('valido');
  }

  //Muestro los datos enviados en el formulario
  resultado.innerHTML = `<span>Formulario enviado correctamente.</span><br>Nombre: ${
    nombrePlan.value
  } <br> Código: ${
    codigoPlan.value
  } <br> Tipo: ${tipoSeleccionado} <br> País: ${
    pais.value === '' ? 'No seleccionado' : pais.value
  }`;
});

//Limpiar el contenido el formulario, resultados y errores
borrar.addEventListener('click', () => {
  //Quito el borde verde a la opcion tipo de plan seleccionada
  obtenerElementoInputTipoPlanSeleccionado().parentNode.classList.remove(
    'bordeValido'
  );
  //Reseteo el formulario
  formulario.reset();
  //Elimino los resultados y errores
  resultado.innerHTML = '';
  errores.innerHTML = '';
  //Elimino los estilos de validacion
  nombrePlan.classList.remove('valido');
  codigoPlan.classList.remove('valido');
  pais.classList.remove('valido');
});

//Añadir un evento de tipo input sobre cualquier elemento input del formulario para que se borren los resultados cuando se modifique el valor de algun input, ya que no sabemos si los nuevos resultados son correctos
let tipoPlanSeleccionado = obtenerElementoInputTipoPlanSeleccionado();
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    resultado.innerHTML = '';
    errores.innerHTML = '';
    input.classList.remove('valido');
  });
});

//Añadir un evento a tipo plan que cuando cambie la opcion seleccionada, se quite el borde verde de la opcion anterior seleccionada
document.querySelectorAll('input[name=tipoPlan]').forEach(input => {
  input.addEventListener('change', () => {
    document.querySelectorAll('input[name=tipoPlan]').forEach(input => {
      input.parentNode.classList.remove('bordeValido');
    });
  });
});

//LocalStorage
if (localStorage) {
  //Busco el div donde se muestra el contador de visitas
  let vecesVisitada = document.getElementById('vecesVisitada');
  if (localStorage.getItem('vecesVisitadaCreacionPlanes') === null) {
    localStorage.setItem('vecesVisitadaCreacionPlanes', 1);
    vecesVisitada.innerHTML =
      '&#x1F496 Has visitado esta página 1 vez &#x1F496';
  } else {
    let visitas = localStorage.getItem('vecesVisitadaCreacionPlanes');
    //Actualizo el contador de visitas
    localStorage.setItem('vecesVisitadaCreacionPlanes', parseInt(visitas) + 1);
    vecesVisitada.innerHTML = `&#x1F496 Has visitado esta página ${
      parseInt(visitas) + 1
    } veces &#x1F496`;
  }
}
