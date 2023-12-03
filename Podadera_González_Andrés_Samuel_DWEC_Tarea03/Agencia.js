import Espia from "./Espia.js";

export default class Agencia {
    #name;
    #country;
    #_agents = [];
    constructor(name, country) {
        this.name = name;
        this.country = country;
    }

    get nameAgency() {
        return this.#name;
    }

    set nameAgency(name) {
        this.#name = name;
    }

    get country() {
        return this.#country;
    }

    set country(country) {
        switch (country) {
            case "USA":
                this.#country = country;
                break;
            case "Reino Unido":
                this.#country = country;
                break;
            case "URSS":
                this.#country = country;
                break;
            default:
                throw new Error("Nombre de agencia no válido")
        }
    }

    get _agents() {
        // proteccion del array enviando una copia del mismo
        let mutableAgents = [...this.#_agents];
        return mutableAgents;
    }

    //reclutarAgente()
    toRecruitAgent(wantedAgent) {
        let initialSize = this.#_agents.length;
        let finalSize;
        let agentFound = false;
        for (let agent of this.#_agents) {
            if (wantedAgent.name === agent.name) {
                agentFound = true;
            }
        }
        if (!agentFound) {
            finalSize = this.#_agents.push(wantedAgent);
        }
        return initialSize !== finalSize;
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
        //return `| ${agent.name.padEnd(21)} | ${agent.country.padEnd(11)} | ${agent.age.toString().padEnd(4)} | ${agent.type.padEnd(16)} |\n`;
        return `<tr><td>${agent.name}</td><td>${agent.country}</td><td>${agent.age}</td><td>${agent.type}</td></tr>`;
    }

    toString() {
        //     const agencyTitle = `|         Agencia: ${this.name.padEnd(13)}     País: ${this.country.padEnd(15)}      |`
        //     const header = "| Nombre                | País        | Edad | Tipo             |";
        //     const separator = "+-----------------------+-------------+------+------------------+";

        //     let result = "";
        //     result = `${separator}\n${agencyTitle}\n${separator}\n${header}\n${separator}\n`;
        //     this.#_agents.forEach((agent) => {
        //         result += this.#_giveFormatToInfo(agent);
        //     });
        //     result += `${separator}\n`;

        //     return result;
        const agencyTitle = `<tr><td colspan="4" style="text-align: center;">Agencia: ${this.name} - País: ${this.country}</td></tr>`;
        const header = "<tr><th>Nombre</th><th>País</th><th>Edad</th><th>Tipo</th></tr>";

        let result = "<table border='1'>";
        result += agencyTitle + header;
        this.#_agents.forEach((agent) => {
            result += this.#_giveFormatToInfo(agent);
        });
        result += "</table>";

        return result;
    }

}

//Creamos el objeto.
// let cia = new Agencia("CIA", "USA");
// let jamesbond = new Espia("James Bond1", "Reino Unido", 39, "desestabilizador");
// jamesbond.toString();
// let mataHari = new Espia("Margaret", "URSS", 25, "infiltrado");
// mataHari.toString();

// cia.toRecruitAgent(mataHari);
// cia.toRecruitAgent(jamesbond);
// cia.toString();
// console.log(cia.toOrderedAgentList());
// console.log(cia.toListAgents("infiltrado"));
// console.log(cia.toListAgents("sin tipo"));