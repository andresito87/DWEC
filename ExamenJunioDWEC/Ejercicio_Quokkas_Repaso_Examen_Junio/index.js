document.addEventListener('DOMContentLoaded', () => {
  /*  Ejercicio 1: Formulario de adopción de quokkas.
  Tu misión es proteger de la extinción a los quokkas. 

Para ello vamos a crear un formulario de se va a realizar un formulario de adopción de Quokkas (utilizando DOM o jQuery). Deberéis contemplar los siguientes puntos:

Un primer campo que es el nombre del quokka. No se especifica la longitud. Va a estar compuesto de dos palabras separadas por un espacio a tres máximo. Los caracteres válidos para el nombre serán alfabéticos latinos desde «a» a la «z» mayúsculas o minúsculas SIN ACENTOS. La segunda palabra debe comenzar en mayúscula.

Perry Come → Correcto.

Perry   come→ Incorrecto. Aunque tiene tres espacios máximo la segunda es mayúscula.

elvis Quokka → Correcto. No es obligatorio que empiece la primera palabra en mayúscula.

Reggaeton. → Incorrecta. Una sola palabra y a los quokkas les mola el rock y Madonna.

Un segundo campo de texto, humano adoptador, va a ser un código de adopción (password) con las siguientes condiciones:

- La última letra debe estar en minúscula.

- Debe aparecer “,” obligatoriamente. No hay límite.

- No puede contener la palabra "extinción" (sin acento).

- Debe comenzar por * y la longitud máxima es de 20.

- No pueden aparecer dígitos. El resto de los caracteres está permitido.

Un tercer campo de texto, donación anual, debe ser un número entre 0 y 1000. La ,  (coma) va a ser el separador y no el punto.

Un botón enviar que muestra un div con id=”resultado” el contenido del formulario sin enviarse realmente. Al enviar correctamente se debe mostrar la foto del animal seleccionado, el nombre del quokka, los datos del humano. Debe ser elegido entre varias fotos que se adjuntan al examen. Esa elección será al azar entre el total.

Los mensajes de error deben ser creados con DOM.  O sea creas un párrafo, con negr

<p> contenido  texto indicando corrección o error <b> contenido campo error  o éxito </b> </p>

Deberéis cambiar el color de fondo a amarillo si ha habido un error en ese campo.

Nota: No se puede utilizar pattern. Se pueden utilizar regex101 y páginas similares (pero preguntándome antes). La elegancia del código también está en esos puntos. Primero que funcione. Puedes hacer otra solución con pattern para practicar.*/

  const botonEnviarFormulario = document.getElementById(
    'botonEnviarFormulario'
  );

  // Cuando hacen click en el botón enviar formulario
  botonEnviarFormulario.addEventListener('click', event => {
    // cancelo el envío del formulario
    event.preventDefault();
    // eliminar el contenido de resultado
    // document.getElementById('resultado').innerHTML = '';
    while (document.getElementById('resultado').hasChildNodes()) {
      document
        .getElementById('resultado')
        .removeChild(document.getElementById('resultado').firstChild);
    }
    const nombre = document.getElementById('nombre').value;
    const humanoAdoptador = document.getElementById('humanoAdoptador').value;
    const donacionAnual = document.getElementById('donacionAnual').value;

    const patronNombre = /[A-Z]?[a-zA-Z]+ [A-Z][a-zA-Z]+( [A-Z][a-zA-Z]+)?/;
    // no excluye la palabra extinción
    const patronHumanoAdoptador =
      /^\*(?:([^0-9]{0,17}),[^0-9]*[a-z]|[^0-9]{0,18},[^0-9]*[a-z])(?<!extincion)$/;
    const patronDonacionAnual = /^(0|[1-9]\d{0,2})(,\d{1,2})?$/;

    if (!patronNombre.test(nombre)) {
      document.getElementById('nombre').style.backgroundColor = 'yellow';
      const parrafoNombre = document.createElement('p');
      parrafoNombre.innerHTML = `Nombre incorrecto: <b>${
        nombre == '' ? '"(campo vacío)"' : nombre
      }</b>`;
      document.getElementById('resultado').appendChild(parrafoNombre);
    } else {
      document.getElementById('nombre').style.backgroundColor = '';
    }

    if (!patronHumanoAdoptador.test(humanoAdoptador)) {
      document.getElementById('humanoAdoptador').style.backgroundColor =
        'yellow';
      const parrafoHumanoAdoptador = document.createElement('p');
      parrafoHumanoAdoptador.innerHTML = `Código de adopción incorrecto: <b>${
        humanoAdoptador == '' ? '"(campo vacío)"' : humanoAdoptador
      }</b>`;
      document.getElementById('resultado').appendChild(parrafoHumanoAdoptador);
    } else {
      document.getElementById('humanoAdoptador').style.backgroundColor = '';
    }

    if (!patronDonacionAnual.test(donacionAnual)) {
      document.getElementById('donacionAnual').style.backgroundColor = 'yellow';
      const parrafoDonacionAnual = document.createElement('p');
      parrafoDonacionAnual.innerHTML = `Donación anual incorrecta: <b>${
        donacionAnual == '' ? '"(campo vacío)"' : donacionAnual
      }</b>`;
      document.getElementById('resultado').appendChild(parrafoDonacionAnual);
    } else {
      document.getElementById('donacionAnual').style.backgroundColor = '';
    }

    if (
      patronNombre.test(nombre) &&
      patronHumanoAdoptador.test(humanoAdoptador) &&
      patronDonacionAnual.test(donacionAnual)
    ) {
      // añadir la imagen
      const imagen = document.createElement('img');
      // elegir una imagen al azar
      const numeroImagen = Math.floor(Math.random() * 6) + 1;
      imagen.src = `./imagenes/${numeroImagen}.jpeg`;
      document.getElementById('resultado').appendChild(imagen);

      // añadir el nombre del quokka
      const parrafoNombre = document.createElement('p');
      parrafoNombre.textContent = `Nombre: ${nombre}`;
      document.getElementById('resultado').appendChild(parrafoNombre);

      // añadir los datos del humano
      const parrafoHumanoAdoptador = document.createElement('p');
      parrafoHumanoAdoptador.textContent = `Código de adopción: ${humanoAdoptador}`;
      document.getElementById('resultado').appendChild(parrafoHumanoAdoptador);

      // añadir la donación anual
      const parrafoDonacionAnual = document.createElement('p');
      parrafoDonacionAnual.textContent = `Donación anual: ${donacionAnual}`;
      document.getElementById('resultado').appendChild(parrafoDonacionAnual);
    }
  });

  // Ejercicio 2: Quokkas en adopción.
  /*
Realiza el examen dos veces, una con jQuery y otra con  fetch.

Se va a obtener la siguiente información (calculando):

Tenemos 6 quokkas.

Felcicín es el que más amigos tiene.

El alimento que más gusta es: “Hierbas Frescas”.

Hay 4 saltadores profesionales.
*/

  // ************ FETCH ************ //
  const divContenidoFetch = document.getElementById('contenidoFetch');

  document.getElementById('botonFetch').addEventListener('click', () => {
    // eliminar el contenido anterior sin usar innerHTML
    // divContenidoFetch.innerHTML = '';
    while (divContenidoFetch.hasChildNodes()) {
      divContenidoFetch.removeChild(divContenidoFetch.firstChild);
    }
    // añadir imagen de carga
    const imagenCarga = document.createElement('img');
    imagenCarga.src = './ajaxquokka.gif';
    imagenCarga.alt = 'imagen de carga quokka';
    imagenCarga.id = 'imagenCarga';
    divContenidoFetch.appendChild(imagenCarga);
    fetch('./quokka.json')
      .then(res => res.json())
      .then(data => {
        let contadorQuokkas = 0;
        let cantidadQuokkasSaltadores = 0;
        let setQuokkas = new Set();
        for (const key in data) {
          // contador de quokkas
          contadorQuokkas++;
          // contador de quokkas saltadores
          if (
            data[key]['caracteristicas_adicionales']['saltador_profesional']
          ) {
            cantidadQuokkasSaltadores++;
          }
          // set con los nombres de los quokkas
          setQuokkas.add(data[key]['nombre']);
        }
        // crear un objeto con claves todos los nombres del set y valores 0
        let quokkasAmigos = {};
        setQuokkas.forEach(quokka => {
          quokkasAmigos[quokka] = 0;
        });

        // parrafo con las cantidad de quokkas
        const parrafoCantidadQuokkas = document.createElement('p');
        parrafoCantidadQuokkas.textContent = `Cantidad de quokkas: ${contadorQuokkas}, sí ${setQuokkas.size} quokkas diferentes`;
        divContenidoFetch.appendChild(parrafoCantidadQuokkas);

        // parrafo con la cantidad de quokkas saltadores
        const parrafoQuokkasSaltadores = document.createElement('p');
        parrafoQuokkasSaltadores.textContent = `Hay ${cantidadQuokkasSaltadores} quokkas saltadores`;
        divContenidoFetch.appendChild(parrafoQuokkasSaltadores);

        // set con los amigos de los quokkas
        for (const key in data) {
          setQuokkas.forEach(quokka => {
            if (
              data[key]['caracteristicas_adicionales']['amigos'].includes(
                quokka
              )
            ) {
              quokkasAmigos[quokka]++;
            }
          });
        }

        // transformar el objeto en un array para obtener el quokka con mas amigos
        const arrayQuokkas = Object.entries(quokkasAmigos);
        const quokkaMasAmigos = arrayQuokkas.reduce((acc, quokka) => {
          if (quokka[1] > acc[1]) {
            return quokka;
          } else {
            return acc;
          }
        });

        // obtener el maximo de un array
        const quokkaMasAmigos2 = arrayQuokkas.reduce((acc, quokka) => {
          return Math.max(acc, quokka[1]);
        }, 0);

        // parrafo con el quokka con más amigos y la cantidad de amigos que tiene
        const parrafoQuokkaMasAmigos = document.createElement('p');
        parrafoQuokkaMasAmigos.textContent = `${quokkaMasAmigos[0]} es el quokka con más amigos, tiene ${quokkaMasAmigos2} amigos`;
        divContenidoFetch.appendChild(parrafoQuokkaMasAmigos);

        // set con las comidas favoritas
        const setComidas = new Set();
        for (const key in data) {
          data[key]['caracteristicas_adicionales']['comida_favorita'].forEach(
            comida => {
              setComidas.add(comida);
            }
          );
        }

        // parrafo con la comida que mas gusta
        let parrafoComidaMasGusta = document.createElement('p');
        let contadorComidas = 0;
        let comidaMasGusta = '';
        setComidas.forEach(comida => {
          let contador = 0;
          for (const key in data) {
            if (
              data[key]['caracteristicas_adicionales'][
                'comida_favorita'
              ].includes(comida)
            ) {
              contador++;
            }

            if (contador > contadorComidas) {
              contadorComidas = contador;
              comidaMasGusta = comida;
              cantidadComidaMasGusta = contador;
            }
          }
        });
        parrafoComidaMasGusta.textContent = `La comida que más gusta es ${comidaMasGusta}, le gusta a ${cantidadComidaMasGusta} quokkas`;
        divContenidoFetch.appendChild(parrafoComidaMasGusta);

        // set con los colores de los quokkas
        const setColores = new Set();
        for (const key in data) {
          setColores.add(data[key]['color'].split(' y ')[0]);
        }
        let parrafoColorMasPopular = document.createElement('p');
        let contadorColores = 0;
        let colorMasPopular = '';
        setColores.forEach(color => {
          let contador = 0;
          for (const key in data) {
            data[key]['color'].split(' y ').forEach(colorQuokka => {
              if (colorQuokka === color) {
                contador++;
              }
            });

            if (contador > contadorColores) {
              contadorColores = contador;
              colorMasPopular = color;
            }
          }
        });

        // parrafo con el color más popular entre los quokkas
        parrafoColorMasPopular.textContent = `El color más popular es ${colorMasPopular}, lo tienen ${contadorColores} quokkas`;
        divContenidoFetch.appendChild(parrafoColorMasPopular);
      })
      .catch(error => console.error('Error al obtener los datos', error))
      .finally(() => {
        console.warn('La consulta ha finalizado');
        // quito la imagen de carga
        document.getElementById('imagenCarga').remove();
      });
  });
});

// ************ JQUERY ************ //
$(document).ready(() => {
  $('#botonJQuery').click(() => {
    // limpiar el contenido anterior
    $('#contenidoJQuery').empty();
    // añadir imagen de carga
    $('#contenidoJQuery').append(
      '<img src="./ajaxquokka.gif" alt="imagen de carga quokka" id="imagenCarga">'
    );
    // realizo la consulta con jQuery
    $.getJSON('./quokka.json', data => {
      let contadorQuokkas = 0;
      let cantidadQuokkasSaltadores = 0;
      let setQuokkas = new Set();
      for (const key in data) {
        // contador de quokkas
        contadorQuokkas++;
        // contador de quokkas saltadores
        if (data[key]['caracteristicas_adicionales']['saltador_profesional']) {
          cantidadQuokkasSaltadores++;
        }
        // set con los nombres de los quokkas
        setQuokkas.add(data[key]['nombre']);
      }
      // crear un objeto con claves todos los nombres del set y valores 0
      let quokkasAmigos = {};
      setQuokkas.forEach(quokka => {
        quokkasAmigos[quokka] = 0;
      });

      // parrafo con las cantidad de quokkas
      const parrafoCantidadQuokkas = $('<p></p>').text(
        `Cantidad de quokkas: ${contadorQuokkas}, sí ${setQuokkas.size} quokkas diferentes`
      );
      $('#contenidoJQuery').append(parrafoCantidadQuokkas);

      // parrafo con la cantidad de quokkas saltadores
      const parrafoQuokkasSaltadores = $('<p></p>').text(
        `Hay ${cantidadQuokkasSaltadores} quokkas saltadores`
      );
      $('#contenidoJQuery').append(parrafoQuokkasSaltadores);

      // set con los amigos de los quokkas
      for (const key in data) {
        setQuokkas.forEach(quokka => {
          if (
            data[key]['caracteristicas_adicionales']['amigos'].includes(quokka)
          ) {
            quokkasAmigos[quokka]++;
          }
        });
      }

      // transformar el objeto en un array para obtener el quokka con mas amigos
      const arrayQuokkas = Object.entries(quokkasAmigos);
      const quokkaMasAmigos = arrayQuokkas.reduce((acc, quokka) => {
        if (quokka[1] > acc[1]) {
          return quokka;
        } else {
          return acc;
        }
      });

      // obtener el maximo de un array
      const quokkaMasAmigos2 = arrayQuokkas.reduce((acc, quokka) => {
        return Math.max(acc, quokka[1]);
      }, 0);

      // parrafo con el quokka con más amigos y la cantidad de amigos que tiene
      const parrafoQuokkaMasAmigos = $('<p></p>').text(
        `${quokkaMasAmigos[0]} es el quokka con más amigos, tiene ${quokkaMasAmigos2} amigos`
      );
      $('#contenidoJQuery').append(parrafoQuokkaMasAmigos);

      // set con las comidas favoritas
      const setComidas = new Set();
      for (const key in data) {
        data[key]['caracteristicas_adicionales']['comida_favorita'].forEach(
          comida => {
            setComidas.add(comida);
          }
        );
      }

      // parrafo con la comida que mas gusta
      let parrafoComidaMasGusta = $('<p></p>');
      let contadorComidas = 0;
      let comidaMasGusta = '';
      setComidas.forEach(comida => {
        let contador = 0;
        for (const key in data) {
          if (
            data[key]['caracteristicas_adicionales'][
              'comida_favorita'
            ].includes(comida)
          ) {
            contador++;
          }

          if (contador > contadorComidas) {
            contadorComidas = contador;
            comidaMasGusta = comida;
            cantidadComidaMasGusta = contador;
          }
        }
      });
      parrafoComidaMasGusta.text(
        `La comida que más gusta es ${comidaMasGusta}, le gusta a ${cantidadComidaMasGusta} quokkas`
      );
      $('#contenidoJQuery').append(parrafoComidaMasGusta);

      // set con los colores de los quokkas
      const setColores = new Set();
      for (const key in data) {
        setColores.add(data[key]['color'].split(' y ')[0]);
      }
      let parrafoColorMasPopular = $('<p></p>');
      let contadorColores = 0;
      let colorMasPopular = '';
      setColores.forEach(color => {
        let contador = 0;
        for (const key in data) {
          data[key]['color'].split(' y ').forEach(colorQuokka => {
            if (colorQuokka === color) {
              contador++;
            }
          });

          if (contador > contadorColores) {
            contadorColores = contador;
            colorMasPopular = color;
          }
        }
      });

      // parrafo con el color más popular entre los quokkas
      parrafoColorMasPopular.text(
        `El color más popular es ${colorMasPopular}, lo tienen ${contadorColores} quokkas`
      );
      $('#contenidoJQuery').append(parrafoColorMasPopular);
    })
      .fail(error =>
        console.error(
          'Error al obtener los datos.',
          'Código de error:',
          error.status,
          error.statusText
        )
      )
      .always(() => {
        console.warn(`La consulta ha finalizado`);
        // quito la imagen de carga
        $('#imagenCarga').remove();
      });
  });
});
