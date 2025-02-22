<template>
    <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ISBN</th>
              <th scope="col">庫存編號</th>
              <th scope="col">書名</th>
              <th scope="col">作者</th>
              <th scope="col">簡介</th>
              <th scope="col">還書時間</th>
              <th scope="col">借閱紀錄編號</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books">
                <td>{{ book.isbn }}</td>
                <td>{{ book.borrowingRecordId }}</td>
                <td>{{ book.name }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.introduction }}</td>
                <td>{{ book.returnTime }}</td>
                <td>{{ book.borrowingRecordId }}</td>
        
            </tr>
          </tbody>
        </table>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import { errorHandler } from "@/util/errorHandler";
import api from "@/api/axios";

const books = reactive([]);
// 還書紀錄
async function getBorrowedBooks(){
    try{
        const response = await api.get(`/book/showReturnRecord`);
    console.log(response.data);
    books.length = 0;
    books.push(...response.data.returnRecordList
    );
    console.log("books:",books);
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