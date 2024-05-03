<?php
// Conectamos á base de datos e cargamos as funcións de conversion de datas MySQL que están 
// definidas no arquivo conexion.php
require("conexion.php");

$sql=sprintf("insert into incidencias(data,aula, profecomunica,proferesolve,descripcion,resolta) values ('%s','%s','%s','%s','%s','%s')",
	cambiaf_a_mysql($_POST['data']),$_POST['aula'],$_POST['profec'],$_POST['profer'],$_POST['descripcion'],$_POST['resolta']);

mysql_query($sql,$miconexion) or die(mysql_error());

echo "<font color=green><strong>Os datos foron insertados correctamente...</strong></font>";

mysql_close($miconexion);
?>