export default class Citizen {

    //Static Properties
    static #_MIN_NAME_LENGTH = 5;
    static #_MAX_AGE = 125;
    static #_MIN_AGE = 1;

    //Private Properties
    #_name;
    #_country;
    #_age;

    constructor(name, country, age) {
        this.name = name;
        this.country = country;
        this.age = age;
    }

    get name() {
        return this.#_name;
    }

    set name(name) {
        if (typeof name.trim() !== "string") {
            throw new Error("Nombre no válido. Debe ser una cadena de caracteres.");
        }
        if (name.trim().length < Citizen.#_MIN_NAME_LENGTH) {
            throw new Error("Longitud de nombre inferior a 5 caracteres.");
        }
        this.#_name = name.trim();
    }

    get country() {
        return this.#_country;
    }

    set country(country) {
        let validatedCountry = country.trim().toUpperCase();
        //We can improve it using a enum of valid countries or a array of valid countries
        switch (validatedCountry) {
            case "USA":
                this.#_country = "USA";
                break;
            case "URSS":
                this.#_country = "URSS";
                break;
            case "REINO UNIDO":
                this.#_country = "Reino Unido";
                break;
            case "RDA":
                this.#_country = "RDA";
                break;
            case "RFA":
                this.#_country = "RFA";
                break;
            case "FRANCIA":
                this.#_country = "Francia";
                break;
            case "SUIZA":
                this.#_country = "Suiza";
                break;
            default:
                //Country value not valid, we assign a default value
                console.warn("Nombre del país no aceptado, asignado Suiza como valor por defecto");
                this.#_country = "Suiza";
        }
    }

    get age() {
        return this.#_age;
    }

    set age(age) {
        if (typeof age !== "number" || !Number.isInteger(age)) {
            throw new Error("Edad no válida. Debe ser un número entero.");
        }
        if (age < Citizen.#_MIN_AGE || Citizen.#_MAX_AGE < age) {
            throw new Error("Edad fuera del rango permitido.");
        }
        this.#_age = age;
    }

    toString() {
        return `Nombre: ${this.name} | País: ${this.country} | Edad: ${this.age} años`;
    }
}

