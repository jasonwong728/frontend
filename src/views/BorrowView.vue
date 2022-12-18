<template>
    <ContentField>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>借阅时间</th>
                    <th>ISBN</th>
                    <th>书名</th>
                    <th>作者</th>
                    <th>出版社</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in borrowed_books" :key="book.ISBN">
                    <td>{{ book.date }}</td>
                    <td>{{ book.ISBN }}</td>
                    <td>{{ book.name }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.publisher }}</td>
                    <td>
                        <button type="button" class="btn btn-warning" @click="return_book(book.ISBN)">还书</button>
                    </td>
                    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
                        <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <strong class="me-auto">图书馆</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                已还书
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
import { useStore } from 'vuex';
import { Toast } from 'bootstrap';

export default {
    components: {
        ContentField,
    },
    setup() {
        let borrowed_books = ref([])
        const store = useStore()

        const process_data = resp => {
            let p = resp[0], q = resp[1]
            let data_should_show = []
            for(let i = 0;i < p.length;i ++) {
                data_should_show.push({
                    ISBN: p[i].isbn,
                    date: p[i].borrow_date,
                    name: q[i].name,
                    author: q[i].author,
                    publisher: q[i].publisher,
                })
            }
            borrowed_books.value = data_should_show
        }

        const return_book = ISBN => {
            new Toast(document.querySelector('#liveToast')).show()
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/return",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    isbn: ISBN,
                    userId: store.state.user.id,
                    status: "本部"
                }),
                success(resp) {
                    console.log(resp)
                    // getBorrowedBooks()
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }

        const getBorrowedBooks = () => {
            $.ajax({
                url: "http://127.0.0.1:3000/library/user/getBorrowedBooks",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    userId: store.state.user.id,
                }),
                success(resp) {
                    console.log(resp)
                    process_data(resp)
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }
        getBorrowedBooks()
        return {
            borrowed_books,
            return_book,
        }
    }
}
</script>

<style scoped>

</style>