<template>
    <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ISBN</th>
              <th scope="col">書名</th>
              <th scope="col">作者</th>
              <th scope="col">簡介</th>
              <th scope="col">可借閱數量</th>
              <th scope="col">借閱</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books">
                <td>{{ book.isbn }}</td>
                <td>{{ book.name }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.introduction }}</td>
                <td>{{ book.borrowable }}</td>
                <td>
                    <button class="btn btn-primary" @click="borrowABook(book.isbn)">借閱</button>
                </td>
            </tr>
          </tbody>
        </table>

</template>
<script setup>
import { reactive, onMounted } from "vue";
import api from "@/api/axios";

import Swal from 'sweetalert2';
const books = reactive([]);
const apiBaseUrl = import.meta.env.VITE_API_URL;
async function getAllBooks(){
    const response = await api.get(
        `${apiBaseUrl}/book/showAllBooks`
      );
      console.log(response.data);
      books.length = 0;
      books.push(...response.data.borrowableBookList);
      console.log("books:",books);
}
async function borrowABook(isbn) {
  try {
    const response = await api.post(`${apiBaseUrl}/book/borrowABook`, {
        "isbn":isbn
    },{  withCredentials: true 
});

    console.log(response.data);
    Swal.fire({
      title: "借閱成功",
      icon: "success",
      confirmButtonText: "確定"
    });
    getAllBooks();
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        title: "請先登入",
        text: "您的帳戶未登入，請登入後再嘗試",
        icon: "warning",
        confirmButtonText: "確定"
      }).then(() => {
        window.location.href = "/login"; 
      });
    } else {
      Swal.fire({
        title: "錯誤",
        text: "發生未知錯誤，請稍後再試",
        icon: "error",
        confirmButtonText: "確定"
      });
    }
  }
}

onMounted(() => {
    getAllBooks();
});

</script>