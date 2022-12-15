import $ from 'jquery'
export default ({
    state: {
        username: "",
        role: "",
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.username = user.username
            state.role = user.role
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
                success(resp) {
                    context.commit("updateUser", resp)
                    user.success()
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