export default class Citizen {
    //Static Properties
    static #MIN_LENGTH_NAME = 5;
    static #MAX_AGE = 125;
    static #MIN_AGE = 1;

    //Private Properties
    #name;
    #country;
    #age;

    constructor(name, country, age) {
        this.name = name;
        this.country = country;
        this.age = age;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        if (name.length < Citizen.#MIN_LENGTH_NAME) {
            throw new Error("Longitud de nombre inferior a 5 caracteres");
        }
        this.#name = name;
    }

    get country() {
        return this.#country;
    }

    set country(country) {
        //We can improve it using a enum of valid countries
        switch (country) {
            case "USA":
                this.#country = "USA";
                break;
            case "URSS":
                this.#country = "URSS";
                break;
            case "Reino Unido":
                this.#country = "Reino Unido";
                break;
            case "RDA":
                this.#country = "RDA";
                break;
            case "RFA":
                this.#country = "RFA";
                break;
            case "Francia":
                this.#country = "Francia";
                break;
            case "Suiza":
                this.#country = "Suiza";
                break;
            default:
                this.#country = "Suiza";
            //exercise's statement doesn't say anything about throwing an error
            //throw new Error("Nombre del país no aceptado, asignado Suiza como valor por defecto");
        }
    }

    get age() {
        return this.#age;
    }

    set age(age) {
        if (age < Citizen.#MIN_AGE || Citizen.#MAX_AGE < age) {
            throw new Error("Edad fuera del rango permitido.");
        }
        this.#age = age;
    }

    toString() {
        return `Ciudadano: ${this.name} procedente de ${this.country}, tiene ${this.age} años`;
    }
}

