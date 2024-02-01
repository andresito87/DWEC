import Quoka from "./Quokka.js";
import MafiaQuokka from "./MafiaQuokka.js";

let divRottnest = document.getElementById("rottnest");
let divBald = document.getElementById("bald");
let divRottnestMafia = document.getElementById("rottnestMafia");
let divBaldMafia = document.getElementById("baldMafia");

//Creación de Quokkas
let quokkaMarcus = new Quoka("Marcus", 18, "Rottnest");
let quokkaMilo = new Quoka("Milo", 5, "Bald");
let quokkaRosie = new Quoka("Rosie", 15, "Rottnest");
let quokkaJasper = new Quoka("Jasper", 9, "Rottnest");
let quokkaStella = new Quoka("Stella", 11, "Bald");

let corralQuokas = [];
corralQuokas.push(quokkaMarcus);
corralQuokas.push(quokkaMilo);
corralQuokas.push(quokkaRosie);
corralQuokas.push(quokkaJasper);
corralQuokas.push(quokkaStella);

divRottnest.innerHTML = `<h2 class="rojo">Isla Rottnest<h2>`;
divBald.innerHTML = `<h2 class="azul">Isla Bald</h2>`;
corralQuokas.forEach(function (quokka) {
  if (quokka.zona === "Rottnest") {
    divRottnest.innerHTML += `<p class="rojo">${quokka.toString()}</p>`;
  } else {
    divBald.innerHTML += `<p class="azul">${quokka.toString()}</p>`;
  }
});

//Creación de MafiaQuokkas
let mafiaQuokkaBruce = new MafiaQuokka("Bruce Lee", 10, "Bald", "quokka1.jpeg");
let mafiaQuokkaJet = new MafiaQuokka("Jet Li", 3, "Rottnest", "quokka2.jpeg");
let mafiaQuokkaMichelle = new MafiaQuokka(
  "Michelle Yeoh",
  5,
  "Rottnest",
  "quokka3.jpeg"
);
let mafiaQuokkaJackie = new MafiaQuokka(
  "Jackie Chan",
  9,
  "Rottnest",
  "quokka4.jpeg"
);
let mafiaQuokkaLyoto = new MafiaQuokka(
  "Lyoto Machida",
  8,
  "Rottnest",
  "quokka5.jpeg"
);
let mafiaQuokkaGina = new MafiaQuokka("Gina Carano", 4, "Bald", "quokka6.jpeg");
let mafiaQuokkaDonnie = new MafiaQuokka(
  "Donnie Yen",
  9,
  "Rottnest",
  "quokka7.jpeg"
);
let mafiaQuokkaRonda = new MafiaQuokka(
  "Ronda Rousey",
  7,
  "Bald",
  "quokka8.jpeg"
);

let corralMafiaQuokkas = [];
corralMafiaQuokkas.push(mafiaQuokkaBruce);
corralMafiaQuokkas.push(mafiaQuokkaJet);
corralMafiaQuokkas.push(mafiaQuokkaMichelle);
corralMafiaQuokkas.push(mafiaQuokkaJackie);
corralMafiaQuokkas.push(mafiaQuokkaLyoto);
corralMafiaQuokkas.push(mafiaQuokkaGina);
corralMafiaQuokkas.push(mafiaQuokkaDonnie);
corralMafiaQuokkas.push(mafiaQuokkaRonda);

divRottnestMafia.innerHTML = `<h2 class="rojo">Isla Rottnest<h2>`;
divBaldMafia.innerHTML = `<h2 class="azul">Isla Bald</h2>`;
console.log(mafiaQuokkaBruce.toString());
corralMafiaQuokkas.forEach(function (quokka) {
  if (quokka.zona === "Rottnest") {
    divRottnestMafia.innerHTML += `<p class="rojo">${quokka.toString()}</p>`;
  } else {
    divBaldMafia.innerHTML += `<p class="azul">${quokka.toString()}</p>`;
  }
});
