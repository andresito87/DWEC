import Citizen from './Citizen.js';
import Spy from './Spy.js';
import Agency from './Agency.js';

//Select the DOM element with id="contenido"
let contentHtml = document.getElementById("contenido");

//Creating 4 citizens
contentHtml.innerHTML = "<h2>CIUDADANOS:</h2>";
try {
    let citizen1 = new Citizen("Roger", "USA", 34);
    contentHtml.innerHTML += citizen1.toString() + "<br>";
    let citizen2 = new Citizen("Benard", "Francia", 55);
    contentHtml.innerHTML += citizen2.toString() + "<br>";
    let citizen3 = new Citizen("Sigmund", "Suiza", 64);
    contentHtml.innerHTML += citizen3.toString() + "<br>";
    let citizen4 = new Citizen("Alexander", "RFA", 21);
    contentHtml.innerHTML += citizen4.toString() + "<br>";

    //Make it fail creating a citizen with a age out of range. The error message is shown in the console.
    new Citizen("Alexander", "RFA", -21);

    //Make it fail creating a citizen with a age is not a number. The error message is shown in the console.
    // new Citizen("Alexander", "RFA", "asad");

    //Make it show a warning message in the console because the country is not valid
    //new Citizen("Alexander", "España", 21);

    //Introducing a name with spaces at the beginning and at the end
    //console.log(new Citizen("         Jacob Sneider         ", "RFA", 21).name);
} catch (error) {
    console.error(error.message);
}

//Creating 10 spies
contentHtml.innerHTML += "<h2>ESPÍAS:</h2>";
let jamesbond, mataHari, sidneyReilly, kimPhilby, johnAnthonyWalker, olegGordievski, aldrichAmes, karelKoecher, vitalyYurchenko, günterGuillaume;
try {
    jamesbond = new Spy("James Bond", "Reino Unido", 39, "desestabilizador");
    contentHtml.innerHTML += jamesbond.toString() + "<br>";
    mataHari = new Spy("Margaretha Geertruida", "KFA", 25, "infiltrado");
    contentHtml.innerHTML += mataHari.toString() + "<br>";
    sidneyReilly = new Spy("Sidney Reilly", "Reino Unido", 44, "ilegal");
    contentHtml.innerHTML += sidneyReilly.toString() + "<br>";
    kimPhilby = new Spy("Kim Philby", "URSS", 39, "operativo");
    contentHtml.innerHTML += kimPhilby.toString() + "<br>";
    johnAnthonyWalker = new Spy("John Anthony Walker", "USA", 30, "provocador");
    contentHtml.innerHTML += johnAnthonyWalker.toString() + "<br>";
    olegGordievski = new Spy("Oleg Gordievski", "Reino Unido", 65, "infiltrado");
    contentHtml.innerHTML += olegGordievski.toString() + "<br>";
    aldrichAmes = new Spy("Aldrich Ames", "URSS", 42, "durmiente");
    contentHtml.innerHTML += aldrichAmes.toString() + "<br>";
    karelKoecher = new Spy("Karel Koecher", "URSS", 40, "diplomático");
    contentHtml.innerHTML += karelKoecher.toString() + "<br>";
    vitalyYurchenko = new Spy("Vitaly Yurchenko", "URSS", 29, "infiltrado");
    contentHtml.innerHTML += vitalyYurchenko.toString() + "<br>";
    günterGuillaume = new Spy("Günter Guillaume", "KDA", 26, "operativo");
    contentHtml.innerHTML += günterGuillaume.toString() + "<br>";
    //Make it fail creating a spy with a age out of range. The error message is shown in the console.
    new Spy("Alan", "KDA", 18, "operativo");
    //Make it fail creating a spy with a name length out of range. The error message is shown in the console.
    //Comment the previous line to show the error message in the console.
    new Spy("Günter Guillaume", "KDA", 6, "operativo");
    //Make it fail creating a spy with a type not valid. The error message is shown in the console.
    //Comment the previous line to show the error message in the console.
    new Spy("John Deere", "KDA", 18, "tipoNoValido");
} catch (error) {
    console.error(error.message);
}

//Creating 2 agencies
contentHtml.innerHTML += "<h2>AGENCIAS:</h2>";
let cia, kgb;
try {
    cia = new Agency("CIA", "USA");
    kgb = new Agency("KGB", "URSS");
    //Make it fail creating an agency with a country not valid. The error message is shown in the console.
    new Agency("CNI", "España");
} catch (error) {
    console.error(error.message);
}

//To recruit spies
contentHtml.innerHTML += "<strong>Reclutando agentes...</strong><br>";
cia.toRecruitAgent(jamesbond); //Mole or Double Agent
cia.toRecruitAgent(sidneyReilly);
cia.toRecruitAgent(mataHari);
kgb.toRecruitAgent(kimPhilby);
cia.toRecruitAgent(johnAnthonyWalker);
cia.toRecruitAgent(olegGordievski);
kgb.toRecruitAgent(aldrichAmes);
kgb.toRecruitAgent(karelKoecher);
kgb.toRecruitAgent(vitalyYurchenko);
kgb.toRecruitAgent(günterGuillaume);
kgb.toRecruitAgent(jamesbond); //Mole or Double Agent
kgb.toRecruitAgent(mataHari);

//To show info about agencies
contentHtml.innerHTML += cia.toString() + "<br>";
contentHtml.innerHTML += kgb.toString() + "<br>";
contentHtml.innerHTML += "<strong>CIA: Intentando reclutar a James Bond por segunda vez...</strong><br>";
cia.toRecruitAgent(jamesbond) ? contentHtml.innerHTML += "El agente James Bond ha sido reclutado.<br>" : contentHtml.innerHTML += "El agente James Bond ya está reclutado.<br>";


//To fire spies
contentHtml.innerHTML += "<br><strong>Cesando agentes...</strong><br>";
contentHtml.innerHTML += "Cesando a Juan: ";
cia.toFireAgent("Juan") ? contentHtml.innerHTML += "El agente Juan ha sido cesado.<br>" : contentHtml.innerHTML += "No existe ningún agente con ese nombre.<br>";
contentHtml.innerHTML += "Cesando a Margaretha Geertruida: ";
cia.toFireAgent("Margaretha Geertruida") ? contentHtml.innerHTML += "El agente Margaretha Geertruida ha sido cesado.<br>" : contentHtml.innerHTML += "No existe ningún agente con ese nombre.<br>";
contentHtml.innerHTML += "Cesando a Vitaly Yurchenko: ";
kgb.toFireAgent("Vitaly Yurchenko") ? contentHtml.innerHTML += "El agente Vitaly Yurchenko ha sido cesado.<br>" : contentHtml.innerHTML += "No existe ningún agente con ese nombre.<br>";
contentHtml.innerHTML += cia.toString() + "<br>";
contentHtml.innerHTML += kgb.toString() + "<br>";

//To list agents of every agency
contentHtml.innerHTML += "<h2>Listar Agentes de tipo:</h2>";
contentHtml.innerHTML += "<h3 id=\"colorSecundario\">Operativo</h3>";
contentHtml.innerHTML += "<h3>Cia</h3>";
contentHtml.innerHTML += cia.toListAgents("operativo");
contentHtml.innerHTML += "<h3>Kgb</h3>";
contentHtml.innerHTML += kgb.toListAgents("operativo");

//To list ordered agents
contentHtml.innerHTML += "<h2>Ordenar Agentes:</h2>";
contentHtml.innerHTML += "<h3 id=\"colorSecundario\">Por nombre:</h3>";
contentHtml.innerHTML += "<h3>Cia</h3>";
contentHtml.innerHTML += cia.toOrderedAgentList("nombre");
contentHtml.innerHTML += "<h3>Kgb</h3>";
contentHtml.innerHTML += kgb.toOrderedAgentList("nombre");
contentHtml.innerHTML += "<h3 id=\"colorSecundario\">Por edad:</h3>";
contentHtml.innerHTML += "<h3>Cia</h3>";
contentHtml.innerHTML += cia.toOrderedAgentList("edad");
contentHtml.innerHTML += "<h3>Kgb</h3>";
contentHtml.innerHTML += kgb.toOrderedAgentList("edad");

//Ordering by a not valid parameter. The warning message is shown in the console.
kgb.toOrderedAgentList("altura");

//Looking for moles or double agents
function searchMole(agency1, agency2, agentName) {
    let isInAgency1 = agency1.agents.some(agent => agent.name === agentName);
    let isInAgency2 = agency2.agents.some(agent => agent.name === agentName);

    return isInAgency1 && isInAgency2;
}

//To show agents who are moles or double agents
contentHtml.innerHTML += "<h2>Agentes Dobles:</h2>";
let gotMoles = false;
let moleList = "";
for (let agent of cia.agents) {
    if (searchMole(cia, kgb, agent.name)) {
        gotMoles = true;
        moleList += `El agente ${agent.name} es un agente doble.<br>`;
    }
}
//If there are no moles or double agents
if (!gotMoles) {
    moleList = "No hay agentes dobles.";
}

contentHtml.innerHTML += moleList;

