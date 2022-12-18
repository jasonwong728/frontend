<template>
    <ContentField>
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#new-book"
            v-if="$store.state.user.role === '管理'">新书入库</button>
        <div class="modal fade" id="new-book" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新书入库</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="ISBN" class="form-label">ISBN</label>
                            <input type="text" class="form-control" id="ISBN" v-model="ISBN">
                        </div>
                        <div class="mb-3">
                            <label for="category" class="form-label">类别</label>
                            <input type="text" class="form-control" id="category" v-model="category">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">书名</label>
                            <input type="text" class="form-control" id="name" v-model="name">
                        </div>
                        <div class="mb-3">
                            <label for="author" class="form-label">作者</label>
                            <input type="text" class="form-control" id="author" v-model="author">
                        </div>
                        <div class="mb-3">
                            <label for="publisher" class="form-label">出版社</label>
                            <input type="text" class="form-control" id="publisher" v-model="publisher">
                        </div>
                        <div class="mb-3">
                            <label for="price" class="form-label">价格</label>
                            <input type="text" class="form-control" id="price" v-model="price">
                        </div>
                        <div class="mb-3">
                            <label for="number" class="form-label">数量</label>
                            <input type="text" class="form-control" id="number" v-model="number">
                        </div>
                        <div class="mb-3">
                            <label for="status" class="form-label">在馆状态</label>
                            <select id="status" class="form-select" v-model="status">
                                <option>本部</option>
                                <option>南校区</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="add_books">提交</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="search">
            <input type="text" v-model="search_content" style="margin-right:10px">
            <button type="button" class="btn btn-primary" @click="search">搜索</button>
        </div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>类别</th>
                    <th>书名</th>
                    <th>作者</th>
                    <th>出版社</th>
                    <th>价格</th>
                    <th>剩余数量</th>
                    <th>在馆状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books_show" :key="book.isbn">
                    <td>{{ book.isbn }}</td>
                    <td>{{ book.category }}</td>
                    <td>{{ book.name }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.publisher }}</td>
                    <td>{{ book.price }}</td>
                    <td>{{ book.number }}</td>
                    <td>{{ book.status }}</td>
                    <td>
                        <button type="button" class="btn btn-warning" id="liveToastBtn" @click="transferBook(book.isbn)" v-if="book.status !== '本部' && $store.state.user.role === '学生'">调库</button>
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
                            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">图书馆</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    已申请，等待管理员批复。
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" @click="borrow(book.isbn)" v-if="book.status === '本部' && $store.state.user.role === '学生'">借阅</button>
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
                            <div id="liveToast-borrow" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">图书馆</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    借阅成功
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-warning" style="margin-right:10px" @click="showBorrow(book.isbn)" data-bs-toggle="modal" data-bs-target="#borrowed-book" v-if="$store.state.user.role === '管理'">查看借阅</button>
                        <div class="modal fade" id="borrowed-book" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">借阅记录</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>借阅时间</th>
                                                    <th>ISBN</th>
                                                    <th>借阅人学号</th>
                                                    <th>归还时间</th>
                                                    <th>归还地点</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="book in books_borrowed" :key="book.isbn">
                                                    <td>{{ book.borrow_date }}</td>
                                                    <td>{{ book.isbn }}</td>
                                                    <td>{{ book.reader_id }}</td>
                                                    <td>{{ book.return_date }}</td>
                                                    <td>{{ book.return_status }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" @click="bindData(book)" data-bs-toggle="modal" data-bs-target="#modify-book" v-if="$store.state.user.role === '管理'">修改</button>
                        <div class="modal fade" id="modify-book" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">信息修改</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <label for="ISBN" class="form-label">ISBN</label>
                                            <input type="text" class="form-control" id="ISBN" v-model="ISBN">
                                        </div>
                                        <div class="mb-3">
                                            <label for="category" class="form-label">类别</label>
                                            <input type="text" class="form-control" id="category" v-model="category">
                                        </div>
                                        <div class="mb-3">
                                            <label for="name" class="form-label">书名</label>
                                            <input type="text" class="form-control" id="name" v-model="name">
                                        </div>
                                        <div class="mb-3">
                                            <label for="author" class="form-label">作者</label>
                                            <input type="text" class="form-control" id="author" v-model="author">
                                        </div>
                                        <div class="mb-3">
                                            <label for="publisher" class="form-label">出版社</label>
                                            <input type="text" class="form-control" id="publisher" v-model="publisher">
                                        </div>
                                        <div class="mb-3">
                                            <label for="price" class="form-label">价格</label>
                                            <input type="text" class="form-control" id="price" v-model="price">
                                        </div>
                                        <div class="mb-3">
                                            <label for="number" class="form-label">剩余数量</label>
                                            <input type="text" class="form-control" id="number" v-model="number">
                                        </div>
                                        <div class="mb-3">
                                            <label for="status" class="form-label">在馆状态</label>
                                            <select id="status" class="form-select" v-model="status">
                                                <option>本部</option>
                                                <option>南校区</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                                        <button type="button" class="btn btn-primary" @click="update_books">提交</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
                            <div id="liveToast-modify" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <strong class="me-auto">图书馆</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    修改成功
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="...">
            <ul class="pagination" style="float: right">
                <li class="page-item" @click="click_page(-2)">
                    <a class="page-link">前一页</a>
                </li>
                <li :class="'page-item ' + page.is_active" v-for="page in pages_show" :key="page.number"
                    @click="click_page(page.number)">
                    <a class="page-link" href="#">{{ page.number }}</a>
                </li>
                <li class="page-item" @click="click_page(-1)">
                    <a class="page-link" href="#">后一页</a>
                </li>
            </ul>
        </nav>
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
        ContentField
    },
    setup() {
        let search_content = ref('')
        let ISBN = ref('')
        let category = ref('')
        let name = ref('')
        let author = ref('')
        let publisher = ref('')
        let price = ref('')
        let number = ref('')
        let status = ref('')
        let current_page = 1
        let page_size = 5
        let total_books = 0
        let books_show = ref([
            // {
            //     isbn: "114514",
            //     category: "910类",
            //     name: "蔡志浩嘉然二分类",
            //     author: "饭好香",
            //     publisher: "沈阳好果汁出版社",
            //     price: "2.33",
            //     number: "64",
            //     status: "南校区"
            // },
            // {
            //     isbn: "114515",
            //     category: "东北",
            //     name: "东北往事",
            //     author: "饭好香",
            //     publisher: "沈阳好果汁出版社",
            //     price: "2.33",
            //     number: "64",
            //     status: "本部"
            // }
        ])
        let pages_show = ref([])
        const t = {"data":[{"author":"鲁迅","category":"散文","isbn":"10000","name":"鲁迅杂文选","number":6,"price":10.0,"publisher":"少年文艺出版社","status":"珠海"},{"author":"王欣蕊","category":"哲学","isbn":"105123151","name":"蔡志浩的桌艾日记","number":5,"price":11.0,"publisher":"嘉然解馋出版社","status":"南校"},{"author":"蔡志浩","category":"科幻","isbn":"105123154","name":"王欣蕊的星唉日记","number":0,"price":115.0,"publisher":"暨南大学出版社","status":"本部"},{"author":"莫言","category":"小说","isbn":"20000","name":"师傅越来越幽默","number":19,"price":104.0,"publisher":"人民出版社","status":"本部"}],"len":4}
        books_show.value = t.data
        const store = useStore()

        const borrow = ISBN => {
            new Toast(document.querySelector('#liveToast-borrow')).show()
            const sid = store.state.user.id
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/borrow",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    userId: sid,
                    isbn: ISBN
                }),
                success(resp) {
                    console.log(resp)
                    pull_page(current_page - 1)
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }

        const transferBook = ISBN => {
            new Toast(document.querySelector('#liveToast')).show()
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/changeBookRequiredStatus",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    status: "南校区",
                    isbn: ISBN
                }),
                success(resp) {
                    console.log(resp)
                    pull_page(current_page - 1)
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }

        const process_time = data => {
            for(let i = 0;i < data.length;i ++) {
                let t1 = new Date(data[i].borrow_date), t2 = new Date(data[i].return_date)
                data[i].borrow_date = t1.toLocaleDateString().replace(/\//g, "-") + " " + t1.toTimeString().substr(0, 8)
                data[i].return_date = t2.toLocaleDateString().replace(/\//g, "-") + " " + t2.toTimeString().substr(0, 8)
            }
        }

        const books_borrowed = ref([])
        const showBorrow = isbn => {
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/getBorrowedBooks",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    isbn
                }),
                success(resp) {
                    console.log(resp)
                    process_time(resp)
                    books_borrowed.value = resp
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }

        const search = () => {
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/getBooksByInfo",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    info: search_content.value
                }),
                success(resp) {
                    console.log(resp)
                    books_show.value = resp
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }

        const update_books = () => {
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/update",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    isbn: ISBN.value,
                    category: category.value,
                    name: name.value,
                    author: author.value,
                    publisher: publisher.value,
                    price: price.value,
                    number: number.value,
                    status: status.value,
                }),
                success() {
                    pull_page(current_page - 1)
                },
                error(resp) {
                    console.log(resp)
                }
            })
            new Toast(document.querySelector('#liveToast-modify')).show()
        }

        const bindData = book => {
            ISBN.value = book.isbn
            category.value = book.category
            name.value = book.name
            author.value = book.author
            publisher.value = book.publisher
            price.value = book.price
            number.value = book.number
            status.value = book.status
        }

        const add_books = () => {
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/add",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    isbn: ISBN.value,
                    category: category.value,
                    name: name.value,
                    author: author.value,
                    publisher: publisher.value,
                    price: price.value,
                    number: number.value,
                    status: status.value,
                }),
                success() {
                    pull_page(current_page - 1)
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }

        const click_page = page => {
            if(page === -2) {
                page = current_page - 1
            } else if(page === -1) {
                page = current_page + 1
            }
            let max_pages = parseInt(Math.ceil(total_books / page_size))
            if(page >= 1 && page <= max_pages) {
                pull_page(page)
            }
        }

        const update_pages_show = () => {
            let max_pages = parseInt(Math.ceil(total_books / page_size))
            let pages_should_show = []
            for(let i = current_page - 2;i <= current_page + 2;i ++) {
                if(i >= 1 && i <= max_pages) {
                    pages_should_show.push({
                        number: i,
                        is_active: i === current_page ? "active" : "",
                    })
                }
            }
            pages_show.value = pages_should_show
        }

        const pull_page = page => {
            current_page = page
            $.ajax({
                url: "http://127.0.0.1:3000/library/book/getBooks",
                type: "post",
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    curPage: current_page,
                    pageSize: page_size,
                }),
                success(resp) {
                    console.log(resp)
                    books_show.value = resp.data
                    total_books = resp.len
                    update_pages_show()
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }
        
        pull_page(current_page - 1)

        return {
            search_content,
            ISBN,
            category,
            name,
            author,
            publisher,
            price,
            number,
            status,
            books_show,
            pages_show,
            books_borrowed,
            click_page,
            search,
            update_books,
            add_books,
            bindData,
            borrow,
            transferBook,
            showBorrow
        }
    }
}
</script>

<style>
.search {
    float: right;
}
</style>