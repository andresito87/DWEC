<?php
// Conectarse a la base de datos
require("conexion.php");

$sql=sprintf("insert into profesores values('%s','%s','%s','%s')",
	$_POST['identificador'],$_POST['nombre'],$_POST['apellidos'],$_POST['email']);

mysql_query($sql,$miconexion) or die(mysql_error());
mysql_close($miconexion);
echo "Datos insertados OK";
?>