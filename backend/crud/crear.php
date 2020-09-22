<?php

  if ($datos = json_decode(file_get_contents("php://input"), true)) { 
    
    $consulta = "INSERT INTO tareas (tarea) VALUES (:tarea)";
    $consulta_preparada = $conexion->prepare($consulta);
    $consulta_preparada->execute([
      ":tarea" => $datos["tarea"]
    ]);

    $respuesta = [
      "resultado" => $consulta_preparada->rowCount() > 0 ? "ok" : "ko"
    ];
    echo json_encode($respuesta);
    
  } else {
    echo json_encode(["resultado" => "Ha ocurrido un error"]);
  }

?>