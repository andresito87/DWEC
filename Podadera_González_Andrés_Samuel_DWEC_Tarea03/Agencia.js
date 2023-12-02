import Espia from "./espia.js";
import Ciudadano from './ciudadano.js';

export default class Agencia {
    #nameAgency;
    #country;
    #_agents = [];
    constructor(nameAgency, country) {
        this.nameAgency = nameAgency;
        this.country = country;
    }

    get nameAgency() {
        return this.#nameAgency;
    }

    set nameAgency(name) {
        this.#country = name;
    }

    get country() {
        return this.#country;
    }

    set country(country) {
        switch (country) {
            case "USA":
                this.#nameAgency = country;
                break;
            case "Reino Unido":
                this.#nameAgency = country;
                break;
            case "URSS":
                this.#nameAgency = country;
                break;
            default:
                throw new Error("Nombre de agencia no válido")
        }
    }

    //reclutarAgente()
    toRecruitAgent(wantedAgent) {
        let initialSize = this.#_agents.length;
        for (let agent of this.#_agents) {
            if (wantedAgent === agent) {
                throw new Error("¡¡¡El agente ya es de los nuestros!!!");
            }
        }
        return initialSize !== this.#_agents.push(wantedAgent);
    }

    //cesarAgente()
    toFireAgent(name) {
        initialSize
        for (let agent of this.#_agents) {
            if (name === agent.name) {
                this.#_agents.slice(name);
                break;
            }
        }
        return initialSize !== this.#_agents.length;
    }

    //listadoAgentes()
    toListAgents(type) {
        let agentsOfWantedType = [];
        for (let agent of this.#_agents) {
            if (agent.type === type) {
                agentsOfWantedType.push(agent);
            }
        }
        if (agentsOfWantedType.length === 0) {
            return `No hay agentes ${type} en nuestra agencia.`;
        }
        return agentsOfWantedType.toString();
    }

    //listadoOrdenado()
    toOrderedAgentList() {
        let orderedList = [...this.#_agents];

        // Ordenamiento por nombre y luego por edad
        orderedList.sort((a, b) => {
            // Comparación por nombre
            if (a.name > b.name) {
                return 1;
            } else if (a.name < b.name) {
                return -1;
            }
            else {
                // Si los nombres son iguales, ordenar por edad
                return a.age - b.age;
            }
        });

        let orderedListToString = "";
        for (let agent of orderedList) {
            orderedListToString += agent.toString() + "\n";
        }

        return orderedListToString;
    }

    //_formateaInfo()
    #_giveFormatToInfo(agent) {
        return `| ${agent.name.padEnd(13)} | ${agent.country.padEnd(11)} | ${agent.age.toString().padEnd(4)} | ${agent.type.padEnd(16)} |`;
    }

    toString() {
        const header = "| Nombre        | País        | Edad | Tipo             |";
        const separator = "+---------------+-------------+------+------------------+";
        console.log(separator);
        console.log(header);
        console.log(separator);
        this.#_agents.forEach((agent) => {
            console.log(this.#_giveFormatToInfo(agent));
        });
        console.log(separator);
    }

}

//Creamos el objeto.
let cia = new Agencia("CIA", "USA");
let jamesbond = new Espia("James Bond1", "Reino Unido", 39, "desestabilizador");
jamesbond.toString();
let mataHari = new Espia("Margaret", "URSS", 25, "infiltrado");
mataHari.toString();

cia.toRecruitAgent(mataHari);
cia.toRecruitAgent(jamesbond);
cia.toString();
console.log(cia.toOrderedAgentList());
console.log(cia.toListAgents("infiltrado"));
console.log(cia.toListAgents("sin tipo"));