<template>
    <ContentField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="form-floating mb-3">
                        <input v-model="username" type="text" class="form-control" id="floatingInput" placeholder="请输入学号">
                        <label for="floatingInput">学号</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="请输入密码">
                        <label for="floatingPassword">密码</label>
                    </div>
                    <button type="button" class="btn btn-primary">登录</button>
                </form>
            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
import router from '@/router'

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore()
        let error_message = ref('')
        let username = ref('')
        let password = ref('')
        const login = () => {
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    router.push({name : 'home'});
                }
            })
        }

        return {
            login,
            error_message,
            username,
            password,
        }
    }
}
</script>

<style scoped>
button {
    width: 100%;
    margin-top: 13px;
}
</style>