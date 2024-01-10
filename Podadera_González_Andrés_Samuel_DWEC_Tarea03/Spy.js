import Citizen from './Citizen.js';

export default class Spy extends Citizen {
    //Static Properties
    static #MAX_AGE = 125;
    static #MIN_AGE = 16;
    //Private Properties
    #type;

    constructor(name, country, age, type) {
        super(name, country, age);
        this.type = type;
    }

    //Note: if you redefine a getter or setter, you must redefine both

    get country() {
        return super.country;
    }

    set country(country) {
        //We can improve it using a enum of valid countries
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
        if (age < Spy.#MIN_AGE || Spy.#MAX_AGE < age) {
            throw new Error("Edad fuera del rango permitido.");
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
                throw new Error("Tipo de espía no válido");
        }
    }

    toString() {
        return super.toString() + " | Tipo: " + this.#type;
        //return super.toString() + " y es un espía de tipo " + this.#type + ".";
    }
}