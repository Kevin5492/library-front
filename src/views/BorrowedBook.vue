<template>
    <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ISBN</th>
              <th scope="col">庫存編號</th>
              <th scope="col">書名</th>
              <th scope="col">作者</th>
              <th scope="col">簡介</th>
              <th scope="col">借書時間</th>
              <th scope="col">借閱紀錄編號</th>
              <th scope="col">還書</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books">
                <td>{{ book.isbn }}</td>
                <td>{{ book.borrowingRecordId }}</td>
                <td>{{ book.name }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.introduction }}</td>
                <td>{{ book.borrowingTime }}</td>
                <td>{{ book.borrowingRecordId }}</td>
                <td>
                    <button class="btn btn-primary" @click="returnABook(book.borrowingRecordId)">還書</button>
                </td>
            </tr>
          </tbody>
        </table>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import { errorHandler } from "@/util/errorHandler";
import api from "@/api/axios";
import Swal from 'sweetalert2';
const books = reactive([]);
// 取得借閱書籍
async function getBorrowedBooks(){
    try{
        const response = await api.get(`/book/showBorrowedBook`);
    console.log(response.data);
    books.length = 0;
    books.push(...response.data.currentBorrowedBookList
    );
    console.log("books:",books);
    }catch(error){
        errorHandler(error);
    }
    
}
// 還書
async function returnABook(borrowingRecordId){
    try{
    const response = await api.post(`/book/returnABook`,
        {
            "borrowingRecordId": borrowingRecordId
        }
    );
    Swal.fire({
      title: "歸還成功",
      icon: "success",
      confirmButtonText: "確定"
    });
    getBorrowedBooks();
    }catch(error){
        errorHandler(error);
    }
}

onMounted(() => {
    getBorrowedBooks();
});
</script>
<style>
 
</style>