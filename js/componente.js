function tarea(id, tarea, estado) {
  var editando = false;
  // Componentes internos
  var tituloTarea = $('<h3>').addClass('visible').html(tarea); 
  var editorTarea = $('<input>').attr('type', 'text');
  var botonEditar = $('<a>').attr('href', '#').addClass('boton-tarea').html('Editar');
  var botonBorrar = $('<a>').attr('href', '#').addClass('boton-tarea').html('Borrar');
  var botonEstado = $('<button><span></span></button>').addClass(`estado ${estado ? 'terminada' : null}`);

  
  // Editar tarea
  botonEditar.click(function (e) {
    e.preventDefault();
    if (editando) { 
      if (editorTarea.val().trim() != tituloTarea.html()) { 
        var datos = { id: id, operacion: 2, tarea: editorTarea.val().trim() };
        ajax('PUT', datos, respuesta => {
          if (respuesta.resultado == 'ok') {
            tituloTarea.html(editorTarea.val());
            $([editorTarea, tituloTarea]).toggleClass('visible');
            $(this).html('Editar');
            editando = false;
          }
        });
      } else {
        $([editorTarea, tituloTarea]).toggleClass('visible'); 
        $(this).html('Editar');
        editando = false;
      }
    } else {
      editorTarea.val(tituloTarea.html()); 
      $([editorTarea, tituloTarea]).toggleClass('visible'); 
      $(this).html('Guardar');
      editando = true;
    }
  })


  // Borrar tarea
  botonBorrar.click(function (e) {
    e.preventDefault();
    var datos = { id: id };
    ajax('DELETE', datos, respuesta => {
      if (respuesta.resultado == 'ok') {
        $(this).parent().remove();
      }
    })
  });


  // Toggle estado
  botonEstado.click(function () {
    var datos = { id: id, operacion: 1 }
    ajax('PUT', datos, respuesta => { 
      if (respuesta.resultado == 'ok') {
        $(this).toggleClass('terminada');
      }
    })
  });
  

  // Retornamos componente completo
  return $('<div>') 
    .addClass('tarea')
    .append(tituloTarea)
    .append(editorTarea) 
    .append(botonEditar)
    .append(botonBorrar)
    .append(botonEstado);
};


// funcion para aunar las llamadas ajax al backend
function ajax(metodo, datos, callback) {
  $.ajax({
    method: metodo,
    url: 'backend/',
    data: JSON.stringify(datos),
    contentType: 'json',
    success: datos => {
      callback(datos);
    }
  })
}