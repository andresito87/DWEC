export default class Agency {
    //Private properties
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
                throw new Error("Nombre de agencia no válido");
        }
    }

    get _agents() {
        //To protect the array sending a copy
        let copyAgents = [...this.#_agents];
        return copyAgents;
    }

    toRecruitAgent(wantedAgent) {
        let initialSize = this.#_agents.length;
        let agentFound = false;
        for (let agent of this.#_agents) {
            if (wantedAgent.name === agent.name) {
                agentFound = true;
            }
        }
        let finalSize;
        if (!agentFound) {
            finalSize = this.#_agents.push(wantedAgent);
        }
        return initialSize < finalSize;
    }

    toFireAgent(name) {
        let initialSize = this.#_agents.length;
        for (let agent of this.#_agents) {
            if (name === agent.name) {
                this.#_agents.splice(this.#_agents.indexOf(agent), 1);
            }
        }
        return initialSize !== this.#_agents.length;
    }

    toListAgents(type) {
        let agentsOfWantedType = [];
        for (let agent of this.#_agents) {
            if (agent.type === type) {
                agentsOfWantedType.push(agent);
            }
        }
        let result = "";
        if (agentsOfWantedType.length === 0) {
            result = `No hay agentes de tipo "${type}" en la ${this.name}.`;
        } else {
            for (let agent of agentsOfWantedType) {
                result += agent.toString() + "<br>";
            }
        }
        return result;
    }

    toOrderedAgentList(orderingElement) {
        let orderedList = [...this.#_agents];

        // Ordering
        orderedList.sort((a, b) => {
            // By name
            if (orderingElement === "nombre") {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                } else {
                    return 0;
                }
            }
            // By age
            if (orderingElement === "edad") {
                if (a.age < b.age) {
                    return -1;
                }
                if (a.age > b.age) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });

        if (orderingElement !== "nombre" && orderingElement !== "edad") {
            console.warn(`No se realizado ningún ordenamiento. El elemento "${orderingElement}" no es válido.`);
        }

        let orderedListToString = "";
        for (let agent of orderedList) {
            orderedListToString += agent.toString() + "<br>";
        }

        return orderedListToString;
    }

    #_giveFormatToInfo() {
        const agencyTitleTable = `<tr><td id="titleTable" colspan="4" style="text-align: center;">Agencia: ${this.name} - País: ${this.country}</td></tr>`;
        //const header = "<tr><th>Nombre</th><th>País</th><th>Edad</th><th>Tipo</th></tr>";

        let result = "<table border='1'>";
        result += agencyTitleTable;
        //result += header;
        // Ordering by country
        let orderedList = [...this.#_agents];
        orderedList.sort((a, b) => {
            if (a.country < b.country) {
                return -1;
            }
            if (a.country > b.country) {
                return 1;
            } else {
                return 0;
            }
        });
        // Adding agents to the table
        orderedList.forEach((agent) => {
            //result += `<tr><td>${agent.name}</td><td>${agent.country}</td><td>${agent.age}</td><td>${agent.type}</td></tr>`;
            result += `<tr><td>${agent.toString()}</td></tr>`;
        });
        result += "</table>";

        return result;
    }

    toString() {
        return this.#_giveFormatToInfo();
    }

}