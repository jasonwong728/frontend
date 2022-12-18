<template>
    <ContentField>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>类别</th>
                    <th>书名</th>
                    <th>作者</th>
                    <th>出版社</th>
                    <th>价格</th>
                    <th>调库地区</th>
                    <th>在馆状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in borrowed_books" :key="book.isbn">
                    <td>{{ book.isbn }}</td>
                    <td>{{ book.category }}</td>
                    <td>{{ book.name }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.publisher }}</td>
                    <td>{{ book.price }}</td>
                    <td>{{ book.required_status }}</td>
                    <td>{{ book.status }}</td>
                    <td>
                        <button type="button" class="btn btn-success" style="margin-right:10px" @click="agreeOrNot(book.isbn, 'yes')">同意</button>
                        <button type="button" class="btn btn-warning" @click="agreeOrNot(book.isbn, 'no')">不同意</button>
                    </td>
                    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
                        <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <strong class="me-auto">图书馆</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                已处理
                            </div>
                        </div>
                    </div>
                </tr>
            </tbody>
        </table>
    </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField.vue'
import { ref } from 'vue';
import $ from 'jquery'
import { Toast } from 'bootstrap';

export default {
    components: {
        ContentField,
    },
    setup() {
        let borrowed_books = ref([])
        let t = [{"author":"鲁迅","category":"散文","isbn":"10000","name":"鲁迅杂文选","number":7,"price":10.0,"publisher":"少年文艺出版社","required_status":"去往_南校区","status":"珠海"},{"author":"王欣蕊","category":"哲学","isbn":"105123151","name":"原来不只有天才","number":5,"price":11.0,"publisher":"嘉然解馋出版社","required_status":"去往_南校区","status":"珠海"}]
        borrowed_books.value = t

        const agreeOrNot = (isbn, decision) => {
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/manageChangeRequiredStatus",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    isbn,
                    decision,
                }),
                success(resp) {
                    console.log(resp)
                    getBorrowedBooks()
                },
                error(resp) {
                    console.log(resp)
                }
            })
            new Toast(document.querySelector('#liveToast')).show()
        }

        const getBorrowedBooks = () => {
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/getBooksToChangeStatus",
                type: "get",
                dataType: 'json',
                success(resp) {
                    console.log(resp)
                    borrowed_books.value = resp
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }
        getBorrowedBooks()
        return {
            borrowed_books,
            agreeOrNot,
        }
    }
}
</script>

<style scoped>

</style>