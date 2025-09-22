import Swal from 'sweetalert2';

export const swalMsg = (icon, message, duration = 3000) => {

    Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: duration,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    }).fire({
        icon,
        title: message,
        color: (icon === "success" ? "#0F843F" : "#D30C0C"),
        customClass: {
            title: "font-13",
        },
        background: "#fff",
    });
};