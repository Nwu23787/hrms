import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/index'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        //用户token
        token: getToken(),
        isAdmin: Cookies.get('isAdmin'),//是否为管理员
        username: Cookies.get('username'),
        id: Cookies.get('id')
    },
    mutations: {
        //设置token
        setToken(state, obj) {
            state.token = obj.token
            setToken(obj)
        },
        // 删除token
        removeToken(state) {
            state.token = null
            removeToken()
        },
        //重置权限
        resetIsAdmin(state) {
            state.isAdmin = false
        }
    },
    actions: {
        //登录请求
        async login(context, data) {
            const result = await login(data)
            console.log(result);
            context.commit('setToken', result)
            // 设置权限
            context.state.isAdmin = result.isAdmin
            //存储姓名
            context.state.username = result.username
            //存储工号
            context.state.id = result.id
        },

        //登出操作
        logout(context) {
            //删除token
            context.commit('removeToken')
            //重置权限
            context.commit('resetIsAdmin')
        }
    }
})

export default store