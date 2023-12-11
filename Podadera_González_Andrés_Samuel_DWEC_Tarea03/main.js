import Ciudadano from './Ciudadano.js';
import Espia from './Espia.js';
import Agencia from './Agencia.js';

//4 ciudadanos
let salida = document.getElementById("contenido");
salida.innerHTML = "<h2>CIUDADANOS:</h2>";
try {
    let ciudadano1 = new Ciudadano("Roger", "USA", 34);
    salida.innerHTML += ciudadano1.toString() + "<br>";
    let ciudadano2 = new Ciudadano("Benard", "Francia", 55);
    salida.innerHTML += ciudadano2.toString() + "<br>";
    let ciudadano3 = new Ciudadano("Sigmund", "Suiza", 64);
    salida.innerHTML += ciudadano3.toString() + "<br>";
    let ciudadano4 = new Ciudadano("Alexander", "RFA", 21);
    salida.innerHTML += ciudadano4.toString() + "<br>";
    //Hago que falle crear un ciudadano con edad fuera de rango. Se muestra el mensaje de error en la consola.
    new Ciudadano("Alexander", "RFA", -21);
} catch (error) {
    console.warn(error.message);
}

//10 espías
salida.innerHTML += "<h2>ESPÍAS:</h2>";
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
    salida.innerHTML += jamesbond.toString() + "<br>";
    mataHari = new Espia("Margaretha Geertruida", "KFA", 25, "infiltrado");
    salida.innerHTML += mataHari.toString() + "<br>";
    sidneyReilly = new Espia("Sidney Reilly", "Reino Unido", 44, "ilegal");
    + "<br>"; sidneyReilly.toString() + "<br>";
    kimPhilby = new Espia("Kim Philby", "URSS", 39, "operativo");
    salida.innerHTML += kimPhilby.toString() + "<br>";
    johnAnthonyWalker = new Espia("John Anthony Walker", "USA", 30, "provocador");
    salida.innerHTML += johnAnthonyWalker.toString() + "<br>";
    olegGordievski = new Espia("Oleg Gordievski", "Reino Unido", 65, "infiltrado");
    salida.innerHTML += olegGordievski.toString() + "<br>";
    aldrichAmes = new Espia("Aldrich Ames", "URSS", 42, "durmiente");
    salida.innerHTML += aldrichAmes.toString() + "<br>";
    karelKoecher = new Espia("Karel Koecher", "URSS", 40, "diplomático");
    salida.innerHTML += karelKoecher.toString() + "<br>";
    vitalyYurchenko = new Espia("Vitaly Yurchenko", "URSS", 29, "infiltrado");
    salida.innerHTML += vitalyYurchenko.toString() + "<br>";
    günterGuillaume = new Espia("Günter Guillaume", "KDA", 26, "operativo")
    salida.innerHTML += günterGuillaume.toString() + "<br>";
    //Hago que falle crear un espía con edad fuera de rango. Se muestra el mensaje de error en la consola.
    new Espia("Günter Guillaume", "KDA", 6, "operativo")
} catch (error) {
    console.warn(error.message);
}

//2 agencias
salida.innerHTML += "<h2>AGENCIAS:</h2>";
let cia = new Agencia("CIA", "USA");
let kgb = new Agencia("KGB", "URSS");

//Reclutar agentes
salida.innerHTML += "<strong>Reclutando agentes...</strong>";
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
salida.innerHTML += cia.toString() + "<br>";
salida.innerHTML += kgb.toString() + "<br>";

//Cesar agentes
salida.innerHTML += "<strong>Cesando agentes Juan(no existe), Margaretha Geertruida(CIA) y Vitaly Yurchenko(KGB)...</strong>";
cia.toFireAgent("Juan"); //No existe
cia.toFireAgent("Margaretha Geertruida");
kgb.toFireAgent("Vitaly Yurchenko");
salida.innerHTML += cia.toString() + "<br>";
salida.innerHTML += kgb.toString() + "<br>";

salida.innerHTML += "<h2>Listar Agentes de tipo:</h2>";
salida.innerHTML += "<h3 id=\"colorSecundario\">Operativo</h3>";
salida.innerHTML += "<h3>Cia</h3>";
salida.innerHTML += cia.toListAgents("operativo");
salida.innerHTML += "<h3>Kgb</h3>";
salida.innerHTML += kgb.toListAgents("operativo");

salida.innerHTML += "<h2>Ordenar Agentes:</h2>";
salida.innerHTML += "<h3 id=\"colorSecundario\">Por nombre:</h3>";
salida.innerHTML += "<h3>Cia</h3>";
salida.innerHTML += cia.toOrderedAgentList("nombre");
salida.innerHTML += "<h3>Kgb</h3>";
salida.innerHTML += kgb.toOrderedAgentList("nombre");
salida.innerHTML += "<h3 id=\"colorSecundario\">Por edad:</h3>";
salida.innerHTML += "<h3>Cia</h3>";
salida.innerHTML += cia.toOrderedAgentList("edad");
salida.innerHTML += "<h3>Kgb</h3>";
salida.innerHTML += kgb.toOrderedAgentList("edad");



//buscaTopos()
function searchMole(agency1, agency2, agentName) {
    const isInAgency1 = agency1._agents.some(agent => agent.name === agentName);
    const isInAgency2 = agency2._agents.some(agent => agent.name === agentName);

    return isInAgency1 && isInAgency2;
}

salida.innerHTML += "<h2>Agentes Dobles:</h2>";
for (let agent of cia._agents) {
    if (searchMole(cia, kgb, agent.name)) {
        salida.innerHTML += `El agente ${agent.name} es un agente doble.<br>`;
    }
}