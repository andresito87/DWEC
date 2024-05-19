// Create the promise
const promise = fetch(
  'https://upload.wikimedia.org/wikipedia/commons/b/b2/Eagle_nebula_pillars.jpg'
);

// Supply a function that logs successful requests
promise.then(function onSuccess(response) {
  console.log(`HTTP status: ${response.status}`);
});

// Supply a function that logs errors
promise.catch(function onError(error) {
  console.error(`Error: ${error}`);
});

// Supply a function that runs either way
promise.finally(function onFinally() {
  console.log('All done');
});

fetch(
  'https://upload.wikimedia.org/wikipedia/commons/b/b2/Eagle_nebula_pillars.jpg'
)
  .then(response => {
    console.log(`HTTP status: ${response.status}`);
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  })
  .finally(() => {
    console.log('All done');
  });

// Personalizacion de errores
fetch(
  'https://upload.wikimedia.org/wikipedia/commons/b/b2/Eagle_nebula_pillars.jpg'
)
  .then(response => {
    if (!response.ok) {
      // Ordinarily, it's not an error if the server responds to our request
      // Now, let's treat any response other than HTTP 200 OK as an error
      throw new Error(`HTTP code: ${response.status}`);
    } else {
      return response.blob();
    }
  })
  .then(blob => {
    const img = document.getElementById('imgDownload');
    img.src = URL.createObjectURL(blob);
  })
  .catch(error => {
    console.log('An error occurred in the first or second promise');
  });
