//alert('Hola mundo del Front de categorias');

//Vamos a crear funciones para comunicarnos con el back - API - END-POINT
//Creamos la funcion
let idEliminarCategoria=0;
let idActualizarCategoria=0;

function getURL(){
    let URL = window.location.protocol + '//'+window.location.hostname
    if(window.location.port)
        URL+=':'+window.location.port
    return URL
}

function muestraUnaCategoriaFront(id){
    let URL = getURL()+'/categorias/api/'+id;//params
    //alert(URL);
    $.ajax({
        method: 'GET',
        url: URL,
        data: {}, //Body
        success: function( result ) {
            if(result.estado == 1){
                //Debemos mostrar la categoria en la ventana
                const categoria = result.categoria;
                
                document.getElementById('descripcionCategoriaVisualizar').value=categoria.descripcion;
                document.getElementById('observacionesCategoriaVisualizar').value=categoria.observaciones;
            }else{
                //Mostrar el mensaje de error
                alert(result.mensaje);
            }
        }
      });
}

function agregarCategoria(){
    const descripcion = document.getElementById('descripcionCategoriaAgregar').value;
    const observaciones = document.getElementById('observacionesCategoriaAgregar').value;
    const URL = getURL() + '/categorias/api';
    $.ajax({
        method: 'POST', //Metodo
        url: URL, //End POINT
        data: { //Body
            descripcion: descripcion,
            observaciones: observaciones
        },
        success: function( result ) {
          if(result.estado=1){
            //Agregar la categoria a la tabla
            //Mandamos llamar a la categoria
            const categoria  =  result.categoria;
            let tabla        =  $('#tabla-categorias').DataTable();
            let botones      =  generarBotones(categoria);
            let nuevoRenglon =  tabla.row.add([categoria.descripcion,botones]).node();
            //-----Linea agregada para el ID DEL RENGLON------------------------------
            $(nuevoRenglon).attr('id', 'renglon_'+categoria.id);
            //------------------------------------------------------------------------
            $(nuevoRenglon).find('td').addClass('table-td');
            tabla.draw( false )
            //Limpiamos los campos
            document.getElementById('descripcionCategoriaAgregar').value='';
            document.getElementById('observacionesCategoriaAgregar').value='';
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Categoria guardada',
                showConfirmButton: false,
                timer: 1500
              })
          }else{
            alert(result.mensaje);
          }
        }
      });
}

function listaCategoriasFront(){
    let URL = getURL()+'/categorias/api'
    //Vamos a usar la libreria JQUERY de Javascript
    $.ajax({
        method: 'GET',
        url: URL,
        data: {},
        success: function( result ) {
            let estado = result.estado;
            let mensaje = result.mensaje;
            if(estado==1){
                //Vamos a mostrar las categorias
                let categorias = result.categorias;
                let tabla = $('#tabla-categorias').DataTable();
                
                categorias.forEach(categoria => {
                    let Botones = generarBotones(categoria);
                    //alert(categoria.descripcion) 
                    //Aqui es donde debemos mostrar en la tabla
                    //tabla.row.add([categoria.descripcion,Botones]).node.id = 'registro_'+categoria.id;
                    let nuevoRenglon = tabla.row.add([categoria.descripcion,Botones]).node();
                    //-----Linea agregada para el ID DEL RENGLON
                    $(nuevoRenglon).attr('id', 'renglon_'+categoria.id);
                    //-------------------------------------------------------------
                    $(nuevoRenglon).find('td').addClass('table-td');
                    tabla.draw( false );
                });
            }else{
                alert(mensaje);
            }
        }
      });
}

function eliminarCategoriaById(){
   
    $.ajax({
        method: 'DELETE',
        url: getURL()+'/categorias/api/'+idEliminarCategoria,
        data: {},
        success: function( result ) {
             if(result.estado=1){
                //---------------------------------------------------------------
                //1.-Si se elimino de la DB
                //2.-Debemos eliminarlo de la tabla
                let tabla = $('#tabla-categorias').DataTable();
                tabla.row('#renglon_'+idEliminarCategoria).remove().draw();
                //---------------------------------------------------------------
                //3.-Mostrar el mensaje agradable
                Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Categoria eliminada',
                showConfirmButton: false,
                timer: 1500
              })
             }else{
                //Mostrar el mensaje de que no se elimino
                Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Categoria no eliminada',
                showConfirmButton: false,
                timer: 1500
              })
             }
        }
    });
}

function generarBotones(categoria){
    let Botones = '<div class="flex space-x-3 rtl:space-x-reverse">'

    Botones += '<button onclick="muestraUnaCategoriaFront('+categoria.id+')" data-bs-toggle="modal" data-bs-target="#viewModal" class="action-btn" type="button" >'
    Botones += '<iconify-icon icon="heroicons:eye"></iconify-icon>'
    Botones += '</button>'
    
    Botones += '<button onclick="identificaIdActualizar('+categoria.id+')" data-bs-toggle="modal" data-bs-target="#updateModal" class="action-btn" type="button">'
    Botones += '<iconify-icon icon="heroicons:pencil-square"></iconify-icon>'
    Botones += '</button>'
    
    Botones += '<button onclick="identificaIdEliminar('+categoria.id+')" data-bs-toggle="modal" data-bs-target="#deleteModal" class="action-btn" type="button">'
    Botones += '<iconify-icon icon="heroicons:trash"></iconify-icon>'
    Botones += '</button>'

    Botones += '</div>'
    return Botones;
}

function identificaIdEliminar(id){
    idEliminarCategoria = id;
    //alert(idEliminarCategoria);
}

function actualizarCategoriaById(){
    let descripcionCategoria = document.getElementById('nombreCategoriaActualizar').value;
    let observacionesCategoria = document.getElementById('observacionesCategoriaActualizar').value;
    $.ajax({
        method: 'PUT',
        url: getURL()+'/categorias/api/'+idActualizarCategoria,
        data: {
          descripcion: descripcionCategoria,
          observaciones: observacionesCategoria
        },
        success: function( result ) {
          if(result.estado=1){
            //alert(result.mensaje)
            //Debemos actualizar la tabla
            let tabla = $('#tabla-categorias').DataTable();
            ////////////////////////////////////-------3 Pasos /////////
            let renglonTemporal = tabla.row('#renglon_'+idActualizarCategoria).data();
            renglonTemporal[0] = descripcionCategoria;
            tabla.row('#renglon_'+idActualizarCategoria).data(renglonTemporal).draw();
            ///////////////////////////////////-----
            
          }else{
            alert(result.mensaje)
          }
        }
      });
}

function identificaIdActualizar(id){
    idActualizarCategoria=id;
    $.ajax({
        method: 'GET',
        url: getURL()+'/categorias/api/'+idActualizarCategoria,
        data: {},
        success: function( result ) {
            if(result.estado=1){
                let categoria = result.categoria;
                document.getElementById('nombreCategoriaActualizar').value=categoria.descripcion;
                document.getElementById('observacionesCategoriaActualizar').value=categoria.observaciones;
                //alert(categoria.descripcion)
            }else{
                alert(result.mensaje);
            }
        }
      });
}

//La mandamos llamar para que muestre el listado
listaCategoriasFront();


