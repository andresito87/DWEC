
import Ciudadano from './ciudadano.js';

class Espia extends Ciudadano {
    #type;
    constructor(name, country, age, type) {
        super(name, country, age);
        this.type = type;
    }

    //Destacar que si se sobreescribe un getter o un setter, obligatoriamente
    // tengo que sobreescribir el getter o setter correspondiente a ese dato,
    // van en parejas.

    get country() {
        return super.country;
    }

    set country(country) {
        switch (country) {
            case "USA":
                super.country = "USA";
                break;
            case "URSS":
                super.country = "URSS";
                break;
            case "Reino Unido":
                super.country = "Reino Unido";
                break;
            case "RDA":
                super.country = "RDA";
                break;
            case "RFA":
                super.country = "RFA";
                break;
            case "Francia":
                super.country = "Francia";
                break;
            default:
                super.country = "Suiza";
                break;
        }
    }

    get type() {
        return this.#type;
    }

    set type(type) {
        this.#type = type;
    }

    toString() {
        console.log(`${this.name} es un agente ${this.type} de ${this.country} que tiene ${super.age} años.`)
    }

}

let jamesbond = new Espia("James Bond", "Reino Unido", 39, "desestabilizador");
jamesbond.toString();