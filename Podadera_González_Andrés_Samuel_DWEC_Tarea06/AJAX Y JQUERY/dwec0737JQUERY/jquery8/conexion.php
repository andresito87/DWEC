<?php
$servidor="localhost";
$usuario="ajax";
$password="dwec";
$basedatos="ajax";

//Creamos la conexion
$miconexion=mysql_connect($servidor, $usuario, $password) or die(mysql_error());

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos,$miconexion) or die(mysql_error());
?>