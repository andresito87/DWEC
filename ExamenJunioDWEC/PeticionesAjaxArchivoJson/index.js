const tabla = document.querySelector('table tbody');
const rutaArchivoJson = './usuarios.json';

document.getElementById('botonFetch').addEventListener('click', () => {
  cargarUsuariosFetch(rutaArchivoJson);
});

$('#botonJquery').on('click', () => {
  $.ajax(rutaArchivoJson, {
    success: function (data) {
      data.forEach(usuario => {
        const row = $(`
  <tr>
    <td>${usuario.name}</td>
    <td>${usuario.address.street}, ${usuario.address.suite} - ${usuario.address.city}</td>
    <td>${usuario.phone}</td>
  </tr>
`);

        $('table tbody').append(row);
      });
    },
    error: function (error) {
      console.log('Error al obtener los datos', error);
    },
  });
});

document.getElementById('botonLimpiar').addEventListener('click', () => {
  //let elements = document.querySelector('table tbody').children;
  //Array.from(elements).forEach(element => element.remove());
  //[...elements].forEach(element => element.remove());
  $('table tbody').empty();
});

function cargarUsuariosFetch($pathArchivoJson) {
  fetch($pathArchivoJson)
    .then(response => response.json())
    .then(data => {
      data.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML += `
        <td>${usuario.name}</td>
        <td>${usuario.address.street}, ${usuario.address.suite} - ${usuario.address.city}</td>
        <td>${usuario.phone}</td>
        `;
        tabla.append(row);
      });
    })
    .catch(error => console.log(error.message));
}
