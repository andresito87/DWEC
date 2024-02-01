import Ciudadano from "./ciudadano.js";//importo la clase Ciudadano de su modulo correspondiente.

class Espia extends Ciudadano {
	#_tipo;

	constructor(nombre, pais, edad, tipo)
	{
		//heredo de la clase super la propiedades
		super(nombre, pais, edad);
		this.tipo = tipo;
	}
	set nombre(nuevo_nombre)
	{
		super.nombre = nuevo_nombre; // en todos los setters llamo a los setters de la clase padre.
	}
	set pais(nuevo_pais)
	{
		const paises_permitidos = ["USA", "URSS", "Reino Unido", "RDA", "RFA", "Francia", "Suiza"];
		if (paises_permitidos.includes(nuevo_pais))
			super.pais = nuevo_pais;
		else
			super.pais = "Suiza"; //pais Suiza por defecto en caso de error, no lanzo warn porque no se pide.
	}
	set edad(nueva_edad)
	{
		if (nueva_edad && Number.isInteger(nueva_edad) && (nueva_edad > 16 && nueva_edad < 125))
			super.edad = nueva_edad;
		else
			throw new Error("La edad debe ser un entero mayor a 16 y menor a 125");
	}
	set tipo(nuevo_tipo)
	{
		const tipos_permitidos = ["desestabilizador", "diplomático", "infiltrado", "ilegal", "operativo", "provocador", "durmiente"];
		if (nuevo_tipo && typeof nuevo_tipo === "string" && tipos_permitidos.includes(nuevo_tipo) && nuevo_tipo.length < 20)
			this.#_tipo = nuevo_tipo;
		else
		{
			this.#_tipo = "sin tipo";//en caso de escribir un tipo no solicitado  asigno sin tipo y envio un warn a consola.
			console.warn("Tipo incorrecto de espia");
		}
	}
	//getters
	get nombre()
	{
		return (super.nombre);
	}
	get pais()
	{
		return (super.pais);
	}
	get edad()
	{
		return (super.edad);
	}
	get tipo()
	{
		return (this.#_tipo);
	}
	toString()
	{
		return (super.toString() + " de tipo " + this.#_tipo);//devuelvo el toString de la clase padre y agrego el tipo de espia.
	}
}
export default Espia;