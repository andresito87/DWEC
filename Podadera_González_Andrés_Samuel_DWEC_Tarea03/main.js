import Ciudadano from './Ciudadano.js';
import Espia from './Espia.js';
import Agencia from './Agencia.js';

//4 ciudadanos
document.getElementById("salida").innerHTML = "CIUDADANOS:<br>";
try {
    let ciudadano1 = new Ciudadano("Roger", "USA", 34);
    document.getElementById("salida").innerHTML += ciudadano1.toString() + "<br>";
    let ciudadano2 = new Ciudadano("Benard", "Francia", 55);
    document.getElementById("salida").innerHTML += ciudadano2.toString() + "<br>";
    let ciudadano3 = new Ciudadano("Sigmund", "Suiza", 64);
    document.getElementById("salida").innerHTML += ciudadano3.toString() + "<br>";
    let ciudadano4 = new Ciudadano("Alexander", "RFA", 21);
    document.getElementById("salida").innerHTML += ciudadano4.toString() + "<br>";
    new Ciudadano("Alexander", "RFA", -21);
} catch (error) {
    console.warn(error.message);
}

//10 espías
document.getElementById("salida").innerHTML += "ESPÍAS:<br>";
let jamesbond;
let mataHari;
let sidneyReilly;
let kimPhilby;
let johnAnthonyWalker;
let olegGordievski;
let aldrichAmes;
let karelKoecher;
let vitalyYurchenko;
let günterGuillaume;
try {
    jamesbond = new Espia("James Bond", "Reino Unido", 39, "desestabilizador");
    document.getElementById("salida").innerHTML += jamesbond.toString() + "<br>";
    mataHari = new Espia("Margaretha Geertruida", "KFA", 25, "infiltrado");
    document.getElementById("salida").innerHTML += mataHari.toString() + "<br>";
    sidneyReilly = new Espia("Sidney Reilly", "Reino Unido", 44, "ilegal");
    + "<br>"; sidneyReilly.toString() + "<br>";
    kimPhilby = new Espia("Kim Philby", "URSS", 39, "operativo");
    document.getElementById("salida").innerHTML += kimPhilby.toString() + "<br>";
    johnAnthonyWalker = new Espia("John Anthony Walker", "USA", 30, "provocador");
    document.getElementById("salida").innerHTML += johnAnthonyWalker.toString() + "<br>";
    olegGordievski = new Espia("Oleg Gordievski", "Reino Unido", 65, "infiltrado");
    document.getElementById("salida").innerHTML += olegGordievski.toString() + "<br>";
    aldrichAmes = new Espia("Aldrich Ames", "URSS", 42, "durmiente");
    document.getElementById("salida").innerHTML += aldrichAmes.toString() + "<br>";
    karelKoecher = new Espia("Karel Koecher", "URSS", 40, "diplomático");
    document.getElementById("salida").innerHTML += karelKoecher.toString() + "<br>";
    vitalyYurchenko = new Espia("Vitaly Yurchenko", "URSS", 29, "infiltrado");
    document.getElementById("salida").innerHTML += vitalyYurchenko.toString() + "<br>";
    günterGuillaume = new Espia("Günter Guillaume", "KDA", 26, "operativo")
    document.getElementById("salida").innerHTML += günterGuillaume.toString() + "<br>";
    new Espia("Günter Guillaume", "KDA", 6, "operativo")
} catch (error) {
    console.log(error.message);
}

//2 agencias
document.getElementById("salida").innerHTML += "AGENCIAS:<br>";
let cia = new Agencia("CIA", "USA");
let kgb = new Agencia("KGB", "URSS");

cia.toRecruitAgent(jamesbond);
cia.toRecruitAgent(mataHari);
cia.toRecruitAgent(sidneyReilly);
kgb.toRecruitAgent(kimPhilby);
cia.toRecruitAgent(johnAnthonyWalker);
cia.toRecruitAgent(olegGordievski);
kgb.toRecruitAgent(aldrichAmes);
kgb.toRecruitAgent(karelKoecher);
kgb.toRecruitAgent(vitalyYurchenko);
kgb.toRecruitAgent(günterGuillaume);
kgb.toRecruitAgent(jamesbond);
kgb.toRecruitAgent(mataHari);
document.getElementById("salida").innerHTML += cia.toString() + "<br>";
document.getElementById("salida").innerHTML += kgb.toString() + "<br>";


//buscaTopos()
function searchMole(agency1, agency2, agentName) {
    const isInAgency1 = agency1._agents.some(agent => agent.name === agentName);
    const isInAgency2 = agency2._agents.some(agent => agent.name === agentName);

    return isInAgency1 && isInAgency2;
}

document.getElementById("salida").innerHTML += "AGENTES DOBLES:<br>";
let agent = "James Bond";
document.getElementById("salida").innerHTML += `El agente ${agent} ${searchMole(cia, kgb, agent) ? "es" : "no es"} un agente doble.<br>`;
agent = "Margaretha Geertruida";
document.getElementById("salida").innerHTML += `La agente ${agent} ${searchMole(cia, kgb, agent) ? "es" : "no es"} una agente doble.` + "<br>";
agent = "Sidney Reilly";
document.getElementById("salida").innerHTML += `El agente ${agent} ${searchMole(cia, kgb, agent) ? "es" : "no es"} un agente doble.` + "<br>";

