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

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('botonFetch').addEventListener('click', () => {
    // eliminar el contenido anterior sin usar innerHTML
    // divContenidoFetch.innerHTML = '';
    while (divContenidoFetch.hasChildNodes()) {
      divContenidoFetch.removeChild(divContenidoFetch.firstChild);
    }
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
      .finally(console.warn(`La consulta ha finalizado`));
  });
});

// ************ JQUERY ************ //
$(document).ready(() => {
  $('#botonJQuery').click(() => {
    $('#contenidoJQuery').empty();
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
      .always(() => console.warn(`La consulta ha finalizado`));
  });
});
