import Espia from "./espia.js";

class Agencia
{
	#_nombreAgencia;
	#_pais;
	#_agentes;

	constructor(nombreAgencia, pais)
	{
		this.nombreAgencia = nombreAgencia;
		this.pais = pais;
		this.#_agentes = [];
	}
	set nombreAgencia(nuevo_nombre_agencia)
	{
		if(nuevo_nombre_agencia && (typeof nuevo_nombre_agencia === "string") && nuevo_nombre_agencia.length < 20)
			this.#_nombreAgencia = nuevo_nombre_agencia;
		else if (nuevo_nombre_agencia && (typeof nuevo_nombre_agencia === "string") && nuevo_nombre_agencia.length >= 20)
		{
			this.#_nombreAgencia = nuevo_nombre_agencia.slice(0, 19);//Aqui he decidido gestionar el input incorrecto de forma distinta para mostrar opciones diferentes de gestion de inputs.
			console.warn("El nombre es demasiado largo");
		}
		else
		{
			this.#_nombreAgencia = "Nombre incorrecto";
			console.warn("Nombre incorrecto");
		}
	}
	set pais(nuevo_pais)
	{
		const PAISES_PERMITIDOS = ["USA", "Reino Unido", "URSS"];
		if (nuevo_pais && nuevo_pais.length < 20 && (typeof nuevo_pais === "string") && PAISES_PERMITIDOS.includes(nuevo_pais))
			this.#_pais = nuevo_pais;
		else
		{
			this.#_pais = "País no permitido";
			console.warn("El pais es incorrecto");
		}
	}
	get nombreAgencia()
	{
		this.#_nombreAgencia;
	}
	get pais()
	{
		this.#_pais;
	}
	reclutarAgente(espia)
	{
		let valor = false;
		if(espia instanceof Espia && !(this.#_agentes.includes(espia)))//compuebo que sea el objeto espia correcto.
		{
			this.#_agentes.push(espia);
			valor = true;
		}
		console.warn("objeto incorrecto")//aviso del objeto incorrecto.
		return (valor);
	}
	cesarAgente(nombre)
	{
		let	agente_valido = false;
		let	i = 0;
		while((agente_valido == false) && (this.#_agentes.length > i)) //uso agent_valido como checker de haber encontrado al agente correcto.
		{
			if(this.#_agentes[i].nombre == nombre)
				agente_valido = true;
			else
				i++;
		}
		if (agente_valido)
			this.#_agentes.splice(i,1);//lo elimino de array, no tengo muy claro si puedo usar splice para esta tarea.
		return (agente_valido);
	}
	listadoAgentes(tipo)
	{
		let	lista_agentes = "";
		let	i = 0;
		while(typeof tipo === "string" && this.#_agentes.length > i)//aseguro que tipo sea de tipo string.
		{
			if(this.#_agentes[i].tipo == tipo)
				lista_agentes += this.#_agentes[i].toString() + " "//cuando se encuentra el tipo de agente llamo a toString para agregar todos sus datos.
			i++;
		}
		return (lista_agentes);
	}
	/*este apartado era el que menos claro tenia, he creado dos funciones para usar en sort si existe 
	otra forma de hacerlo sin no es molestia me gustaria conocerla.*/
	listadoOrdenado(valor)
	{
		let lista_agentes = "";
		let i = 0;
		function comp_edad(a, b)//esta funcion compara dos int y devuelve su diferencia
		{
			return (a.edad - b.edad);
		}
		/*esta funcion compara dos cadena usando locale Compare que no se si se puede usar 
		pero que devulve un numero negativo o positivo dependiendo de si la cadana va antes o despues.*/
		function comp_nombre(a, b)
		{
			return (a.nombre.localeCompare(b.nombre));
		}
		if (valor === "nombre" || valor === "edad")//compruebo tipos de datos correctos
		{
			if (valor === "nombre" )
				this.#_agentes.sort(comp_nombre);//si es nombre llamo a la funcion de comparar strings y ordeno
			else if (valor === "edad")
				this.#_agentes.sort(comp_edad);//si es edad llamo a la funcion de comparar ints y ordeno
			while(this.#_agentes.length > i)
			{
				lista_agentes += this.#_agentes[i].toString() + " "
				i++;
			}
		}
		else
		{
			console.warn("Warn: los criterios para ordenar son: 'nombre' o 'edad'");
			lista_agentes += "Valor incorrecto";
		}
		return(lista_agentes);
	}
	/*este apartado tampoco lo tenia claro, he creado una tabla sencialla a la que se le pueden agregar id y dar formato css
	como leí en el foro también se puede hacer por div agregando las etiquetas <div></div> pero no sabia que tipo de formato
	se quería para la tabla.*/
	#_formateaInfo() {
		const paises = ["USA", "URSS", "Reino Unido", "RDA", "RFA", "Francia", "Suiza"];
		let info = "<table>";
		let i = 0;
		//apartir de un bucle for voy a recorrer el array de paises, voy a imprimir el pais y todos los agentes que tenga dicho pais en su propiedad
		for (const pais of paises) {
			info += "<tr><td>" + pais + "</td></tr>";
			while (this.#_agentes.length > i) 
			{
				if (this.#_agentes[i].pais == pais)
					info += "<tr><td>" + this.#_agentes[i].toString() + "</td></tr>";
				i++;
			}
			i = 0;
		}
		info += "</table>";
		return info;
	}
	toString()
	{
		return this.#_formateaInfo();//este metodo privado solo se puede llamar desde toString.
	}
}
export default Agencia; //exporto agencia.