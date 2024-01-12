export default class Agency {

    //Private properties
    #_name;
    #_country;
    #_agents;

    constructor(name, country) {
        this.name = name;
        this.country = country;
        this.#_agents = [];
    }

    get nameAgency() {
        return this.#_name;
    }

    set nameAgency(name) {
        this.#_name = name;
    }

    get country() {
        return this.#_country;
    }

    set country(country) {
        switch (country) {
            case "USA":
                this.#_country = country;
                break;
            case "Reino Unido":
                this.#_country = country;
                break;
            case "URSS":
                this.#_country = country;
                break;
            default:
                throw new Error("Nombre de agencia no válido.");
        }
    }

    get agents() {
        //To protect the array, sending a copy
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

        // Adding agents(rows) to the table
        let contentTable = "";
        orderedList.forEach(element => {
            // Splitting the string to get the info of the agent
            contentTable += element.toString().split(" | ")
                .reduce((acc, curr) => acc + "<td>" + curr
                    .replace(/Nombre: |País: |Edad: |Tipo: /g, "") + "</td>", "<tr>") + "</tr>";
        });

        return contentTable;
    }

    toString() {
        const agencyTitleTable = `<tr><td id="titleTable" colspan="4" style="text-align: center;">Agencia: ${this.name} - País: ${this.country}</td></tr>`;
        const header = "<tr><th>Nombre</th><th>País</th><th>Edad</th><th>Tipo</th></tr>";
        let result = "<table border='1'>";

        //adding the title and the header
        result += agencyTitleTable;
        result += header;

        //adding the content of the table
        result += this.#_giveFormatToInfo();

        result += "</table>";
        return result;
    }

}