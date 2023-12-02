import Ciudadano from './Ciudadano.js';
import Espia from './Espia.js';
import Agencia from './Agencia.js';

//4 ciudadanos
console.log("CIUDADANOS:")
try {
    let ciudadano1 = new Ciudadano("Roger", "USA", 34);
    console.log(ciudadano1.toString());
    let ciudadano2 = new Ciudadano("Benard", "Francia", 55);
    console.log(ciudadano2.toString());
    let ciudadano3 = new Ciudadano("Sigmund", "Suiza", 64);
    console.log(ciudadano3.toString());
    let ciudadano4 = new Ciudadano("Alexander", "RFA", 21);
    console.log(ciudadano4.toString());
    new Ciudadano("Alexander", "RFA", -21);
} catch (error) {
    console.log(error.message);
}

//10 espías
console.log("\nESPÍAS:");
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
    console.log(jamesbond.toString());
    mataHari = new Espia("Margaretha Geertruida", "KFA", 25, "infiltrado");
    console.log(mataHari.toString());
    sidneyReilly = new Espia("Sidney Reilly", "Reino Unido", 44, "ilegal");
    console.log(sidneyReilly.toString());
    kimPhilby = new Espia("Kim Philby", "URSS", 39, "operativo");
    console.log(kimPhilby.toString());
    johnAnthonyWalker = new Espia("John Anthony Walker", "USA", 30, "provocador");
    console.log(johnAnthonyWalker.toString());
    olegGordievski = new Espia("Oleg Gordievski", "Reino Unido", 65, "infiltrado");
    console.log(olegGordievski.toString());
    aldrichAmes = new Espia("Aldrich Ames", "URSS", 42, "durmiente");
    console.log(aldrichAmes.toString());
    karelKoecher = new Espia("Karel Koecher", "URSS", 40, "diplomático");
    console.log(karelKoecher.toString());
    vitalyYurchenko = new Espia("Vitaly Yurchenko", "URSS", 29, "infiltrado");
    console.log(vitalyYurchenko.toString());
    günterGuillaume = new Espia("Günter Guillaume", "KDA", 26, "operativo")
    console.log(günterGuillaume.toString());
    new Espia("Günter Guillaume", "KDA", 6, "operativo")
} catch (error) {
    console.log(error.message);
}

//2 agencias
console.log("\nAGENCIAS:")
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
console.log(cia.toString());
console.log(kgb.toString());


//buscaTopos()
function searchMole(agency1, agency2, agentName) {
    const isInAgency1 = agency1._agents.some(agent => agent.name === agentName);
    const isInAgency2 = agency2._agents.some(agent => agent.name === agentName);

    return isInAgency1 && isInAgency2;
}

console.log("AGENTES DOBLES:")
let agent = "James Bond";
console.log(`El agente ${agent} ${searchMole(cia, kgb, agent) ? "es" : "no es"} un agente doble.`);
agent = "Margaretha Geertruida";
console.log(`La agente ${agent} ${searchMole(cia, kgb, agent) ? "es" : "no es"} una agente doble.`);
agent = "Sidney Reilly";
console.log(`El agente ${agent} ${searchMole(cia, kgb, agent) ? "es" : "no es"} un agente doble.`);
