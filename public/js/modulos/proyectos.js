import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click', e => {
        // console.log('diste click en eliminar');
        const urlProyecto = e.target.dataset.proyectoUrl;
        // console.log(urlProyecto);

        Swal.fire({
            title: 'Deseas borrar este Proyecto?',
            text: "Un Proyecto eliminado, no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'No, Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                // enviar petición a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                // console.log(url);
                axios.delete(url, {params: urlProyecto})
                    .then(function(respuesta){
                        console.log(respuesta);
                    });
                    return;

              Swal.fire(
                'Proyecto Eliminado',
                'El Proyecto se ha eliminado',
                'success'
              );
    
            //   redireccionar al inicio
            setTimeout(() => {
                window.location.href = '/'
            }, 3000);
    
            }
          })
    })
}

export default btnEliminar;