<?php
// Conectarnos a la base de datos
require("conexion.php");

$sql=sprintf("select * from profesores where identificador='%s'",$_POST['codigo']);
$resultados=mysql_query($sql, $miconexion) or die(mysql_error());

if (mysql_num_rows($resultados) == 0)
	echo json_encode(array("estado"=>"OK","mensaje"=>"Codigo libre"));
else
	echo json_encode(array("estado"=>"ERROR","mensaje"=>"!Codigo no disponible!"));
?>