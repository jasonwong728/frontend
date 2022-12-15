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
            state.username = user.id
            state.role = user.role
        }
    },
    actions: {
        login(context, user) {
            $.ajax({
                url:"http://127.0.0.1:3000/library/user/login",
                type: "post",
                data: {
                    name: user.username,
                    psw: user.password,
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