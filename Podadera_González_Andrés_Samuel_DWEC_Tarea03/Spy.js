import Citizen from './Citizen.js';

export default class Spy extends Citizen {

    //Static Properties
    static #_MAX_AGE = 125;
    static #_MIN_AGE = 16;

    //Private Properties
    #_type;

    constructor(name, country, age, type) {
        super(name, country, age);
        this.type = type;
    }

    //Note: if you redefine a setter, you have to redefine its getter too

    get country() {
        return super.country;
    }

    set country(country) {
        let cleanedCountry = country.trim().toUpperCase();
        //We can improve it using a enum of valid countries or a array of valid countries
        switch (cleanedCountry) {
            case "USA":
                super.country = "USA";
                break;
            case "URSS":
                super.country = "URSS";
                break;
            case "REINO UNIDO":
                super.country = "Reino Unido";
                break;
            case "RDA":
                super.country = "RDA";
                break;
            case "RFA":
                super.country = "RFA";
                break;
            case "FRANCIA":
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
        if (typeof age !== "number" || !Number.isInteger(age)) {
            throw new Error("Edad no válida. Debe ser un número entero.");
        }
        if (age < Spy.#_MIN_AGE || Spy.#_MAX_AGE < age) {
            throw new Error("Edad fuera del rango permitido.");
        }
        super.age = age;
    }

    get type() {
        return this.#_type;
    }

    set type(type) {
        switch (type) {
            case "desestabilizador":
                this.#_type = type;
                break;
            case "diplomático":
                this.#_type = type;
                break;
            case "infiltrado":
                this.#_type = type;
                break;
            case "ilegal":
                this.#_type = type;
                break;
            case "operativo":
                this.#_type = type;
                break;
            case "provocador":
                this.#_type = type;
                break;
            case "durmiente":
                this.#_type = type;
                break;
            default:
                throw new Error("Tipo de espía no válido");
        }
    }

    toString() {
        return super.toString() + " | Tipo: " + this.#_type;
    }
}