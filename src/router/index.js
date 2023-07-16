import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/login',//登录页
        component: () => import('@/views/login/index')
    },
    {
        path: '/',//首页
        redirect: '/home',//主页路由重定向
        component: () => import('@/Layout'),
        //子路由
        children: [
            {
                path: 'home',//主页路由
                component: () => import('@/Layout/home')
            },
            {
                path: 'changeRequest',//变动申请路由
                component: () => import('@/Layout/changeRequest'),
                children: [
                    {
                        path: 'userInfo',//基本信息管理路由
                        component: () => import('@/Layout/changeRequest/userInfo')
                    },
                    {
                        path: 'leave',//退休/离职申请路由
                        component: () => import('@/Layout/changeRequest/leave')
                    },
                    {
                        path: 'transfer',
                        component: () => import('@/Layout/changeRequest/transfer')
                    }
                ]
            },
            {
                path: 'handle',//处理申请路由
                component: () => import('@/Layout/handle')
            },
            {
                path: 'infoManage',//员工信息管理路由
                component: () => import('@/Layout/infoManage')
            },
            {
                path: 'attendanceManage',//考勤管理路由
                component: () => import('@/Layout/attendanceManage')
            },
            {
                path: 'salaryManage',//考勤管理路由
                component: () => import('@/Layout/salaryManage')
            },
            {
                path:'systemManage',//系统管理路由
                component:()=>import('@/Layout/systemManage')
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue')
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router