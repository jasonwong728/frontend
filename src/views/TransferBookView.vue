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
                <tr v-for="book in borrowed_books" :key="book.ISBN">
                    <td>{{ book.isbn }}</td>
                    <td>{{ book.category }}</td>
                    <td>{{ book.name }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.publisher }}</td>
                    <td>{{ book.price }}</td>
                    <td>{{ book.required_status }}</td>
                    <td>{{ book.status }}</td>
                    <td>
                        <button type="button" class="btn btn-success" style="margin-right:10px" @click="agreeOrNot(book.ISBN, 'yes')">同意</button>
                        <button type="button" class="btn btn-warning" @click="agreeOrNot(book.ISBN, 'no')">不同意</button>
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

        const agreeOrNot = (ISBN, decision) => {
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/manageChangeRequiredStatus",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    isbn: ISBN,
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