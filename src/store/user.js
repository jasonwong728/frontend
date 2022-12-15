import $ from 'jquery'
export default ({
    state: {
        username: "",
    },
    getters: {
    },
    mutations: {
        updateUser(state, username) {
            state.username = username
        }
    },
    actions: {
        login(context, user) {
            $.ajax({
                url:"http://127.0.0.1/login",
                type: "post",
                data: {
                    id: null,
                    name: user.username,
                    psw: user.password,
                    role: null,
                },
                success() {
                    context.commit("updateUser", user.username)
                },
                error(resp) {
                    console.log(resp)
                }
            })
        }
    },
    modules: {
    }
  })