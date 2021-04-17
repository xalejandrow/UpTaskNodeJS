import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click', () =>{
        // console.log('diste click en eliminar');
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