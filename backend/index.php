<?php
  header("Content-type: application/json");
  require("includes/bbdd.php");
  
  switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET";  
      include("crud/leer.php");
    break;
    case "POST";  
      include("crud/crear.php");
    break;
    case "PUT";  
      include("crud/editar.php");
    break;
    case "DELETE";  
      include("crud/borrar.php");
    break;
  }

  $conexion = null;

?>