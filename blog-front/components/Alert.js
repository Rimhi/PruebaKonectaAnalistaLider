
import Swal from 'sweetalert2'
const Alert = (icon,title) => {
    
    return Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 1500
      })
}
 
export default Alert;