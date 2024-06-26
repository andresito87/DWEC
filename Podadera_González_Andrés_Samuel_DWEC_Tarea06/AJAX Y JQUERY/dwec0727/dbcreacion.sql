CREATE USER IF NOT EXISTS 'ajax'@'localhost' IDENTIFIED BY 'dwec';

GRANT USAGE ON * . * TO 'ajax'@'localhost' IDENTIFIED BY 'dwec' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;

CREATE DATABASE IF NOT EXISTS `ajax` ;

GRANT ALL PRIVILEGES ON *.* TO 'ajax'@'localhost' WITH GRANT OPTION;

use `ajax`;


CREATE TABLE IF NOT EXISTS `centros` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombrecentro` varchar(150) NOT NULL,
  `localidad` varchar(100) NOT NULL,
  `provincia` varchar(50) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `fechavisita` date NOT NULL,
  `numvisitantes` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Volcar la base de datos para la tabla `centros`
--

INSERT INTO `centros` (`id`, `nombrecentro`, `localidad`, `provincia`, `telefono`, `fechavisita`, `numvisitantes`) VALUES
(1, 'IES Ramon Mª Aller Ulloa', 'Lalin', 'Pontevedra', '986780114', '2010-11-26', 90),
(2, 'IES A Piringalla', 'Lugo', 'Lugo', '982212010', '2010-11-26', 85),
(3, 'IES San Clemente', 'Santiago de Compostela', 'A Coruña', '981580496', '2010-11-26', 60),
(4, 'IES de Teis', 'Vigo', 'Pontevedra', '986373811', '2010-11-27', 72),
(5, 'IES Leliadoura', 'Ribeira', 'A Coruña', '981874633', '2010-11-25', 0),
(6, 'IES Cruceiro Baleares', 'Culleredo', 'A Coruña', '981660700', '2010-11-26', 30),
(7, 'IES Leliadoura', 'Ribeira', 'A Coruña', '981874633', '2010-11-25', 50),
(8, 'IES Cruceiro Baleares', 'Culleredo', 'A Coruña', '981660700', '2010-11-26', 30),
(9, 'IES As Lagoas', 'Ourense', 'Ourense', '988391325', '2010-11-26', 35),
(10, 'IES As Fontiñas', 'Santiago de Compostela', 'A Coruña', '981573440', '2010-11-27', 64);