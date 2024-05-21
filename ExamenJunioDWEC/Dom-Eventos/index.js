let element = document.createElement('div');
element.className = 'message';

let textNode = document.createTextNode('Hello world!');
element.appendChild(textNode);

document.body.appendChild(element);

// Get the body element
let body = document.querySelector('body');

// Get the element with the ID "myDiv"
let myDiv = document.querySelector('#myDiv');

// Get first element with a class of "selected"
let selected = document.querySelector('.selected');

// Get first image with class of "button"
let img = document.body.querySelector('img.button');

// Get all <em> elements in a <div> (similar to getElementsByTagName("em"))
let ems = document.getElementById('myDiv').querySelectorAll('em');

// Get all elements that have "selected" as a class
let selecteds = document.querySelectorAll('.selected');

// Get all <strong> elements inside of <p> elements
let strongs = document.querySelectorAll('p strong');

let myDiv2 = document.getElementById('myDiv');

// set the background color
myDiv2.style.backgroundColor = 'red';

// change the dimensions
myDiv2.style.width = '100px';
myDiv2.style.height = '200px';

// assign a border
myDiv2.style.border = '1px solid black';
