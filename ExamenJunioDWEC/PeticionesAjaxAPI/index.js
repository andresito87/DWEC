// boton para limpiar la zona de contenido
document.getElementById('botonLimpiar').addEventListener('click', () => {
  document.getElementById('contenido').innerHTML = '';
});

// Obtener datos de la api de jsonplaceholder
document.getElementById('botonFetch').addEventListener('click', () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      let posts = [];
      // primeros 10 post
      for (const i in data) {
        if (i >= 0 && i < 5) {
          posts.push(data[i]);
        }
      }
      for (let post in posts) {
        document.getElementById('contenido').innerHTML += `
        <div class="card">
            <div class="card-body">
                <h5>Título: ${posts[post].title}</h5>
                <p>Contenido: ${posts[post].body}</p>
            </div>
        </div>
        `;
      }
    })
    .catch(error => console.error('Error al obtener los datos', error));
});

// Obtener datos de la api de jsonplaceholder con jQuery
$('#botonJquery').on('click', () => {
  $.ajax('https://jsonplaceholder.typicode.com/posts', {
    success: function (data) {
      let posts = [];
      // primeros 10 post
      for (const i in data) {
        if (i >= 0 && i < 5) {
          posts.push(data[i]);
        }
      }
      for (let post in posts) {
        $('#contenido').append(`
        <div class="card">
            <div class="card-body">
                <h5>Título: ${posts[post].title}</h5>
                <p>Contenido: ${posts[post].body}</p>
            </div>
        </div>
        `);
      }
    },
    error: function (error) {
      console.error('Error al obtener los datos', error);
    },
  });
});

// Obtener datos de la api de jsonplaceholder con axios
document.getElementById('botonAxios').addEventListener('click', () => {
  axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      let posts = [];
      // primeros 10 post
      for (const i in response.data) {
        if (i >= 0 && i < 5) {
          posts.push(response.data[i]);
        }
      }
      for (let post in posts) {
        document.getElementById('contenido').innerHTML += `
        <div class="card">
            <div class="card-body">
                <h5>Título: ${posts[post].title}</h5>
                <p>Contenido: ${posts[post].body}</p>
            </div>
        </div>
        `;
      }
    })
    .catch(error => console.error('Error al obtener los datos', error));
});
