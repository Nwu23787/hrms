import request from '@/utils/request'
import qs from 'qs'

/**
 * 登录接口api
 */
export function login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    })
}

/**
 * 获取用户基本信息api
 */
export function getInfo(params) {
    return request({
        url: `/api/getInfo`,
        params
    })
}

/**
 * 修改用户信息api
 */
export function updateInfo(data) {
    return request({
        url: '/api/updateInfo',
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    })
}

/**
 * 提交退休/离职申请api
 */
export function leaveRequest(data) {
    return request({
        url: '/api/leave',
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    })
}

/**
 * 提交部门调动申请api
 */
export function transferRequest(data) {
    return request({
        url: '/api/transfer',
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    })
}

/**
 * 获取所有员工申请列表api
 */
export function getRequestList() {
    return request({
        url: '/api/getRequestList',
    })
}

/**
 * 处理员工请求api
 */
export function handleRequest(data) {
    return request({
        url: '/api/handleRequest',
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    })
}

/**
 * 获取所有员工信息接口
 */
export function getStaffInfoList() {
    return request({
        url: '/api/getStaffInfoList',
    })
}

/**
 * 修改员工基本信息api
 */
export function updateStaffInfo(data) {
    return request({
        url: '/api/updateStaffInfo',
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    })
}

/**
 * 获取员工考勤信息接口
 */
export function getAttendanceInfo(data) {
    return request({
        url: '/api/getAttendanceInfo',
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    })
}

/**
 * 修改员工考勤信息接口
 */
export function updateAttendance(data) {
    return request({
        url: '/api/updateAttendance',
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    })
}

/**
 * 获取本月所有员工考勤信息接口
 */
export function getMonthInfo(data){
    return request({
        url:'/api/getMonthInfo',
    })
}

/**
 * 修改用户密码接口
 */
export function updatePassword(data) {
    return request({
        url: '/api/updatePassword',
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    })
}

/**
 * 删除用户接口
 */
export function deleteUser(data) {
    return request({
        url: '/api/deleteUser',
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    })
}