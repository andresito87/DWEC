<?php
if (isset($_GET['nombrepais']) && $_GET['nombrepais']!="")
{
	require("conexion.php");
	
	$sql="select nombre from paises where nombre like '".$_GET['nombrepais']."%'";
	
	$resultado=mysql_query($sql,$miconexion) or die(mysql_error());
	
	while ($fila=mysql_fetch_assoc($resultado))
		echo "<li>".$fila['nombre']."</li>\n";

	// Devolverá los paises en este formato:
	// <li>Spain</li>
	// <li>France</li>
}
?>