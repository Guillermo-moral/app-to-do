$(() => {

  // Variables
  var contenedor = $('.tareas');
  var formulario = $('form');
  var texto = $('form input[type="text"]');


  // Carga inicial
  $.ajax({
    method: 'GET',
    url: 'backend/',
    success: datos => {
      datos.forEach(item => {
        item.terminada = !!Number(item.terminada); 
        contenedor.append(tarea(item.id, item.tarea, item.terminada,))
      })
    }
  })


  // Crear tareas
  formulario.submit(function(e) {
    e.preventDefault();
    var datos = { tarea: texto.val() };

    $.ajax({
      method: 'POST',
      url: 'backend/',
      data: JSON.stringify(datos),
      contentType : 'json',
      success: datos => {
        if (datos.resultado == 'ok') {
          $.ajax({
            method: 'GET',
            url: 'backend/',
            success: datos => {
              datos[datos.length - 1].terminada = !!Number(datos[datos.length - 1].terminada); 
              contenedor.append(tarea(datos[datos.length - 1].id, datos[datos.length - 1].tarea, datos[datos.length - 1].terminada))
              texto.val('');
            }
          })
        }
      }
    });
  })
});