import $ from 'jquery'
export default ({
    state: {
        id: "2019050610",
        username: "饭好香",
        role: "学生",
        is_login : true
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id
            state.username = user.name
            state.role = user.role
            state.is_login = true
        },
        logout(state) {
            state.id = ""
            state.username = ""
            state.role = ""
            state.is_login = false
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
        },
        logout(context) {
            context.commit("logout")
        }
    },
    modules: {
    }
  })