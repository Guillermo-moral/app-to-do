<?php

  if ($datos = json_decode(file_get_contents("php://input"), true)) { 

    // JSON operacion --> 1 (cambiar estado) || 2 (cambiar texto tarea)

    $datos["operacion"] = intval($datos["operacion"]); 

    if($datos["operacion"] === 1) { // Cambiar estado 
      $consulta = "UPDATE tareas SET terminada = NOT terminada WHERE id = :id";
      $consulta_preparada = $conexion->prepare($consulta);
      $consulta_preparada->execute([
        ":id" => $datos["id"]
      ]);
    } else { // Editar texto
      $consulta = "UPDATE tareas SET tarea = :tarea WHERE id = :id";
      $consulta_preparada = $conexion->prepare($consulta);
      $consulta_preparada->execute([
        ":tarea" => $datos["tarea"],
        ":id" => $datos["id"]
      ]);
    }

    $respuesta = [
      "resultado" => $consulta_preparada->rowCount() > 0 ? "ok" : "ko"
    ];
    echo json_encode($respuesta);
    
  } else {
    echo json_encode(["resultado" => "Ha ocurrido un error"]);
  }

?>