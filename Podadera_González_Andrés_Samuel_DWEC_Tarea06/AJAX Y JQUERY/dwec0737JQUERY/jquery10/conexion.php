<?php
$servidor="localhost";
$usuario="ajax";
$password="dwec";
$basedatos="ajax";

// Creamos la conexion
$miconexion=mysql_connect($servidor, $usuario, $password) or die(mysql_error());

// Seleccionar la base de datos en esa conexion.
mysql_select_db($basedatos,$miconexion) or die(mysql_error());


//////////////////////////////////////////////////// 
//Convierte fecha de normal a mysql 
//////////////////////////////////////////////////// 
function cambiaf_a_mysql($fecha)
{ 
    ereg( "([0-9]{1,2})/([0-9]{1,2})/([0-9]{2,4})", $fecha, $mifecha); 
    $lafecha=$mifecha[3]."-".$mifecha[2]."-".$mifecha[1]; 
    return $lafecha; 
} 

//////////////////////////////////////////////////// 
//Convierte fecha de mysql a normal 
//////////////////////////////////////////////////// 
function cambiaf_a_normal($fecha)
{ 
    ereg( "([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2})", $fecha, $mifecha); 
    $lafecha=$mifecha[3]."/".$mifecha[2]."/".$mifecha[1]; 
    return $lafecha; 
} 
?>