<template>
    <ContentField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="sid" class="form-label">学号</label>
                        <input v-model="sid" type="text" class="form-control" id="sid" placeholder="请输入学号">
                    </div>
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                            placeholder="请输入密码">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="test">角色</label>
                        <input type="text" class="form-control" list="test" id="test2" value='学生'
                            onfocus="this.value=''">
                        <datalist id="test">
                            <option value="学生">学生</option>
                            <option value="管理员">管理员</option>
                        </datalist>
                    </div>
                    <button type="submit" class="btn btn-primary">注册</button>
                </form>

            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField.vue'
import { ref } from 'vue'
import $ from 'jquery'

export default {
    components: {
        ContentField
    },
    setup() {
        let sid = ref('')
        let username = ref('')
        let password = ref('')
        let role = ref('')
        const register = () => {
            $.ajax({
                url: "http://127.0.0.1:3000/library/user/register",
                type:"post",
                data: {
                    id: sid.value,
                    name: username.value,
                    psw: password.value,
                    role: role.value
                },
                success(resp) {
                    console.log(resp)
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }

        return {
            sid,
            username,
            password,
            role,
            register,
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