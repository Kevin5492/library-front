import Swal from 'sweetalert2';
import { useAuthStore } from "@/stores/authStore";

export function errorHandler(error) {
    const authStore = useAuthStore();

    if (error.response && error.response.status === 401) {//如果狀態是401，代表未登入，跳轉到登入頁面
        authStore.logout();
        Swal.fire({
            title: "請先登入",
            text: "您的帳戶未登入，請登入後再嘗試",
            icon: "warning",
            confirmButtonText: "確定"
        }).then(() => {
            window.location.href = "/login";
        });
    } else {
        console.log(error);
        Swal.fire({
            title: "錯誤",
            text: "發生未知錯誤，請稍後再試",
            icon: "error",
            confirmButtonText: "確定"
        });
    }
}