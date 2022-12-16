import $ from 'jquery'
export default ({
    state: {
        id: "",
        role: "",
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id
            state.role = user.role
        }
    },
    actions: {
        login(context, user) {
            $.ajax({
                url:"http://127.0.0.1:3000/library/user/login",
                type: "post",
                dataType:'json',
                contentType:'application/json;charset=UTF-8',
                data: JSON.stringify({
                    id: user.id,
                    psw: user.password,
                }),
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