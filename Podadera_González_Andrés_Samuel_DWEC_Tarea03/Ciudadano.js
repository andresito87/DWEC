export default class Ciudadano {
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
        if (name.length < 5) {
            throw new Error("Longitud de nombre inferior a 5 caracteres");
        }
        this.#name = name;
    }

    get country() {
        return this.#country;
    }

    set country(country) {
        //Se podría mejorar con un array privado de paises válidos
        //Se podría mejorar con un enum de paises válidos
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
            //No se dice que lance excepcion
            //throw new Error("Nombre del país no aceptado, asignado Suiza como valor por defecto");
        }
    }

    get age() {
        return this.#age;
    }

    set age(age) {
        if (age < 1 || age > 125) {
            throw new Error("Edad fuera del rango permitido.");
        }
        this.#age = age;
    }

    toString() {
        return `${this.name} es un ciudadano de ${this.country} que tiene ${this.age} años.`;
    }
}

