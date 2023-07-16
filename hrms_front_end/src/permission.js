import router from '@/router'
import store from '@/store'

//设置白名单页面
const whiteList = ['/login', '/404']

//前置路由守卫 
router.beforeEach((to, from, next) => {
    //跳转前判断是否有token
    if (store.state.token) {
        //判断跳转的是否是登录页
        if (to.path === '/login') {
            //跳转主页
            next('/')
        } else {
            console.log(to.path);
            //要访问的是主页、申请页和404页面，放行
            if (to.path === '/home' || to.path === '/changeRequest/leave' || to.path === '/changeRequest/userInfo' || to.path === '/changeRequest/transfer' || to.path === '/404') {
                next()
            } else {
                // 访问的管理员权限页
                //判断用户是否具有管理员权限
                console.log(store.state.isAdmin);
                if (store.state.isAdmin === 'true' || store.state.isAdmin === true) {
                    //有管理员权限，放行
                    console.log(11);
                    next()
                } else {
                    //该用户不是管理员，拦截
                    next('/404')
                }
            }
        }
    } else {
        //没有token
        // 判断是否要访问白名单页面
        if (whiteList.indexOf(to.path) > -1) {
            //要访问白名单页面
            next()//放行
        } else {
            //访问的不是白名单页面
            next('/login')//跳转登录页
        }
    }
})
//后置路由守卫
router.afterEach()