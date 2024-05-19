function doWorkInChunks() {
  // Get the <p> element to change
  const statusElement = document.getElementById('settimeout');

  // Track the time and the number of passes through the loop
  const startTime = Date.now();
  let counter = 0;

  statusElement.innerText = 'Processing started';

  // Create an anonymous function that does one chunk of work
  const doChunkedTask = () => {
    if (Date.now() - startTime < 10000) {
      counter += 1;
      statusElement.innerText = `Just generated number ${counter}`;

      // Call the function again, for the next chunk
      setTimeout(doChunkedTask, 0);
    } else {
      statusElement.innerText = 'Processing completed';
    }
  };

  // Start the process by calling the function for the first time
  doChunkedTask();
}

doWorkInChunks();

// Con setInterval y clearInterval
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function () {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// Con setTimeout y
printNumbers(5, 10);

// Con setTimeout y clearTimeout
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// uso:
printNumbers(5, 10);
