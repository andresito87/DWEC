import Ciudadano from './Ciudadano.js';

export default class Espia extends Ciudadano {
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

    get age() {
        return super.age;
    }

    set age(age) {
        if (age < 16 || age > 125) {
            throw new Error("Edad fuera del rango permitido.")
        }
        super.age = age;
    }

    get type() {
        return this.#type;
    }

    set type(type) {
        switch (type) {
            case "desestabilizador":
                this.#type = type;
                break;
            case "diplomático":
                this.#type = type;
                break;
            case "infiltrado":
                this.#type = type;
                break;
            case "ilegal":
                this.#type = type;
                break;
            case "operativo":
                this.#type = type;
                break;
            case "provocador":
                this.#type = type;
                break;
            case "durmiente":
                this.#type = type;
                break;
            default:
                throw new Error("Tipo de espía no válido")
        }
    }

    toString() {
        return `${this.name} es un agente ${this.type} de ${this.country} que tiene ${this.age} años.`;
    }

}

// let jamesbond1 = new Espia("James Bond1", "Reino Unido", 39, "desestabilizador");
// console.log(jamesbond1.toString());

// try {
//     let jamesbond2 = new Espia("James Bond2", "Reino Unido", 12, "desestabilizador");
//     console.log(jamesbond2.toString());
// } catch (error) {
//     console.log(error.message)
// }

// try {
//     let jamesbond3 = new Espia("James Bond3", "Reino Unido", 39, "prueba");
//     console.log(jamesbond3.toString());
// } catch (error) {
//     console.log(error.message)
// }