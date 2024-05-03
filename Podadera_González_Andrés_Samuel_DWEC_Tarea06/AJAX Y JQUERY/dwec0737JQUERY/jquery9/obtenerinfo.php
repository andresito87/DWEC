<?php
if (isset($_POST['nombrepais']) && $_POST['nombrepais'] != "")
{
	require("conexion.php");
	
	$sql="select * from paises where nombre='".$_POST['nombrepais']."'";
	
	$resultados=mysql_query($sql, $miconexion) or die (mysql_error());
	
	if (mysql_num_rows($resultados) !=0)
	{
		$fila=mysql_fetch_assoc($resultados);
		
		echo "<br/>Informacion obtenida de la base de datos: ";
		echo "<br/>Nombre: ".$fila['nombre'];
		echo "<br/>Region: ".$fila['region'];
		echo "<br/>Area: ".$fila['area'];
		echo "<br/>Poblacion: ".$fila['poblacion'];
		echo "<br/>GDP: ".$fila['gdp'];
	}
	else
		echo "<br/>Pais no encontrado en la base de datos";
}
?>