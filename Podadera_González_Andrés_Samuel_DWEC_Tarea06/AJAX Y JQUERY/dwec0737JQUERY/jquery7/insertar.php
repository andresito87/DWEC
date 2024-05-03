<?php
	$servidor="localhost";
	$usuario="ajax";
	$basedatos="ajax";
	$password="dwec";
	
	$miconexion = mysql_connect($servidor,$usuario, $password) or die(mysq_error());
	
	mysql_select_db($basedatos,$miconexion) or die(mysql_error());
	
	if (isset($_POST['pais']))
	{
		$sql=sprintf("insert into paises(nombrepais) value('%s')",$_POST['pais']);
		mysql_query($sql,$miconexion) or die(mysql_error());
		mysql_close($miconexion);
		echo "Pais insertado correctamente en la tabla";
	}
?>