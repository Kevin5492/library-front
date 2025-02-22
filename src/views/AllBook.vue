<template>
    <div class="col" style="margin-top: 20px;">
            <label for="status">輸入 查詢內容</label>
            <input 
              type="text" 
              v-model="searchInput" 
              @change="getAllBooks" 
              class="form-control" 
              placeholder="輸入 查詢內容"/>
          </div>
    <div class="container d-flex justify-content-center ">
        
        <table class="table table-striped table-hover text-center">
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
    </div>
   

</template>
<script setup>
import { reactive, onMounted ,ref} from "vue";
import api from "@/api/axios";
import Swal from 'sweetalert2';
import { errorHandler } from "@/util/errorHandler";
const books = reactive([]);
const searchInput = ref("");

async function getAllBooks(){
    const response = await api.post(
        `/book/showAllBooks`,{
            "searchInput":searchInput.value || ""
        },{  withCredentials: true}
      );
      console.log(response.data);
      books.length = 0;
      books.push(...response.data.borrowableBookList);
      console.log("books:",books);
}
async function borrowABook(isbn) {
  try {
    const response = await api.post(`/book/borrowABook`, {
        "isbn":isbn
    },{  withCredentials: true 
});
if(response.data.success){
    Swal.fire({
      title: "借閱成功",
      icon: "success",
      confirmButtonText: "確定"
    });
    getAllBooks();
}else{
    Swal.fire("借閱失敗",response.data.mssg , "warning");}
  } catch (error) {
    errorHandler(error);
  }
}

onMounted(() => {
    getAllBooks();
});

</script>
<style>



</style>