//NOTA: por lo general habría implantado una función general que asegurara el uso de inputs correctos pero no creo que sea el objetivo de la tarea.
class Ciudadano {
	//propiedades privadas.
	#_nombre;
	#_edad;
	#_pais;

	constructor(nombre, pais, edad)
	{
		this.nombre = nombre;
		this.edad = edad;
		this.pais = pais;
	}
	//setters publicos
	set nombre(nuevo_nombre)
	{
		//para el nombre aseguro que sea tipo string y su longitud no sea menor de 5, si no ocurre se lanza un error.
		if (typeof nuevo_nombre === "string" && nuevo_nombre.length >= 5 && nuevo_nombre.length < 20)
			this.#_nombre = nuevo_nombre;
		else
			throw new Error("El nombre debe tener no menos de 5 caracteres y ser un nombre válido.");
	}
	set edad(nueva_edad)
	{
		/*para la edad aseguro que este entre los valores pedidos por la tarea y compruebo que sea un entero ya que 
		no aceto un numero decimal como edad. Para las comprobaciones envio dos tipos diferentes de errores para los casos*/
		if ((nueva_edad && nueva_edad > 0 && nueva_edad < 125) && Number.isInteger(nueva_edad))
			this.#_edad = nueva_edad;
		else if (!Number.isInteger(nueva_edad))
			throw new Error("La edad debe ser un número entero.");
		else
			throw new Error("La edad debe ser mayor a 1 y menor a 125 años.");
	}
	set pais(nuevo_pais)
	{
		/*uso un array declarado con const ya que no quiero permitir su modificación. (no me he enterado muy bien en los videos 
		si es aconsejable usar const en estos casos o es preferible que no)*/
		// RESPUESTA del PROFE: si no vas a cambiar el contenido 
		// mejor const. Si vas a modificarlo let. Si guardas el resultado
		// de una función let es mejor. 
		const PAISES_PERMITIDOS = ["USA", "URSS", "Reino Unido", "RDA", "RFA", "Francia", "Suiza"];
		if (nuevo_pais && nuevo_pais.length < 20 && PAISES_PERMITIDOS.includes(nuevo_pais))
			this.#_pais = nuevo_pais;
		else
		{
			this.#_pais = "Desconocido"; //como no me indican que lance excepcion en caso de valor incorrecto envio un warn a consola e impido _pais de ser undefined.
			console.warn("País incorrecto");
		}
	}
	//getters publicos p
	get nombre()
	{
		return this.#_nombre;
	}
	get edad()
	{
		return this.#_edad;
	}
	get pais()
	{
		return this.#_pais;
	}
	toString()
	{
		return this.nombre + " tiene " + this.edad + " años y es de " + this.pais;
	}
}
//permito que se exporte la clase Ciudadano
export default Ciudadano;