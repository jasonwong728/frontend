<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{name : 'home'}">暨南大学图书馆</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name : 'home'}" v-if="$store.state.user.role === '学生'">书籍借阅</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name : 'borrow_view'}" v-if="$store.state.user.role === '学生'">我的借阅</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-if="$store.state.user.is_login === true">
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            你好，{{ $store.state.user.username }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'user_info_view' }">我的资料</router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#" @click="logout">退出</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <router-link class="nav-link" :to="{ name: 'login_view' }">
                        登录
                    </router-link>
                    <router-link class="nav-link" :to="{ name: 'register_view' }">
                        注册
                    </router-link>
                </ul>

            </div>
        </div>
    </nav>
</template>

<script>
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const logout = () => {
            store.dispatch("logout")
        }

        return {
            logout
        }
    }
}
</script>

<style scoped>

</style>