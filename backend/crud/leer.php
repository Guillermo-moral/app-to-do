<?php

  $consulta = "SELECT * FROM tareas";
  $consulta_preparada = $conexion->prepare($consulta);
  $consulta_preparada->execute();
  $tareas = $consulta_preparada->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($tareas);

?>