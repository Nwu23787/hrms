// 导入数据库操作模块
const db = require('../db/index')
//导入 bcryptjs 包
const bcrypt = require('bcryptjs')
// 导入jwt包
const jwt = require('jsonwebtoken')
//导入全局的token配置文件
const config = require('../config')

/**
 * 以下是人力资源管理接口
 */
//导入mock
const Mock = require('mockjs')

//登录接口
exports.login = (req, res) => {
    console.log('用户登录接口响应');
    console.log(req.body);
    const data = Mock.mock({
        'success': true,
        'code|0-5': 3,
        'message': '登录成功！',
        'data': {
            'username': '@cname',
            'isAdmin|1': false,
            'token|8-9': '82hkwq2ed',
            'id': '@id'
        }
    })
    res.send(data)
}

//获取用户信息接口
exports.getInfo = (req, res) => {
    console.log('获取用户信息接口响应');
    console.log(req.query);
    const data = Mock.mock({
        'code|0-5': 3,
        'success': true,
        'message': '获取用户信息成功！',
        'data': {
            'name': '@cname',
            'age|15-56': 27,
            'sex|1': ['男', '女'],
            'department|1': ['营销部', '技术部', '财务部', '人事部'],
            'post|1': ['经理', '员工'],
            'id': '@id',
            'time|20-200': 66,
            'salary|20-200': 77
        }
    })
    res.send(data)
}

//提交用户信息修改接口
exports.updateInfo = (req, res) => {
    console.log('提交用户信息修改接口响应');
    console.log(req.body);
    const data = Mock.mock({
        'data|1': [
            {
                message: '提交成功',
                code: 0,
                success: true,
                data: {}
            },
            {
                message: '提交失败，请稍后再试',
                code: 1,
                success: false,
                data: {}
            }
        ]

    })
    res.send(data.data)
}

//离职or退休申请接口
exports.leave = (req, res) => {
    //打印请求体
    console.log('离职/退休申请接口响应');
    console.log(req.body);
    const data = Mock.mock({
        'data|1': [
            {
                message: '提交成功',
                code: 0,
                success: true,
                data: {}
            },
            {
                message: '提交失败，请稍后再试',
                code: 1,
                success: false,
                data: {}
            }
        ]

    })
    res.send(data.data)
}

/**
 * 调动申请接口
 */
exports.transfer = (req, res) => {
    //打印请求体
    console.log('调动申请接口响应');
    console.log(req.body);
    const data = Mock.mock({
        'data|1': [
            {
                message: '提交成功',
                code: 0,
                success: true,
                data: {}
            },
            {
                message: '提交失败，请稍后再试',
                code: 1,
                success: false,
                data: {}
            }
        ]

    })
    res.send(data.data)
}

/**
 * 获取请求列表接口
 */
exports.getRequestList = (req, res) => {
    console.log('获取所有用户请求接口响应');
    console.log(req.query);
    const data = Mock.mock({
        'data': {
            'message': '获取成功',
            'code': 0,
            'success': true,
            'data|20': [{
                'RID|0-3000': 4,
                'id|10000-99999': 66666,
                'name': '@cname',
                'sex|1': ['男', '女'],
                'age|18-60': 50,
                'reason': '红红火火恍恍惚惚哈哈哈哈哈哈哈哈哈哈哈',
                'type|1': ['信息变更', '离职', '退休', '调动']
            }]
        }
    })
    res.send(data.data)
}

/**
 * 处理用户申请接口
 */
exports.handleRequest = (req, res) => {
    console.log('处理用户申请接口响应');
    console.log(req.body);
    const data = Mock.mock({
        'data|1': [
            {
                message: '处理请求成功',
                code: 0,
                success: true,
                data: {}
            },
            {
                message: '处理请求失败，请稍后再试',
                code: 1,
                success: false,
                data: {}
            }
        ]

    })
    res.send(data.data)
}

/**
 * 获取所有员工信息接口
 */
exports.getStaffInfoList = (req, res) => {
    console.log('获取所有员工信息接口响应');
    console.log(req.query);
    const data = Mock.mock({
        'data': {
            'message': '获取成功',
            'code': 0,
            'success': true,
            'data|20': [{
                'id|10000-99999': 66666,
                'name': '@cname',
                'sex|1': ['男', '女'],
                'age|18-60': 50,
                'department|1': ['营销部', '技术部', '财务部', '人事部'],
                'post|1': ['经理', '员工'],
                'time|100-500': 173,
                'salary|20-200': 100
            }]
        }
    })
    res.send(data.data)
}

/**
 * 修改员工基本信息接口
 */
exports.updateStaffInfo = (req, res) => {
    console.log('修改员工基本信息接口响应');
    console.log(req.body);
    const data = Mock.mock({
        'data|1': [
            {
                message: '处理请求成功',
                code: 0,
                success: true,
                data: {}
            },
            {
                message: '处理请求失败，请稍后再试',
                code: 1,
                success: false,
                data: {}
            }
        ]

    })
    res.send(data.data)
}

/**
 * 获取员工某天考勤信息接口
 */
exports.getAttendanceInfo = (req, res) => {
    console.log('获取员工某天考勤信息接口响应');
    console.log(req.body);
    const data = Mock.mock({
        'data': {
            'message': '获取成功',
            'code': 0,
            'success': true,
            'data|20': [{
                'id|10000-99999': 66666,
                'name': '@cname',
                'department|1': ['营销部', '技术部', '财务部', '人事部'],
                'post|1': ['经理', '员工'],
                'workTime|0-18': 13,
                'overTime|0-5': 0,
                'absentTime|0-10': 6,
                'leaveTime|0-10': 9

            }]
        }
    })
    res.send(data.data)
}

/**
 * 修改员工考勤信息接口
 */
exports.updateAttendance = (req, res) => {
    console.log('修改员工考勤信息接口响应');
    console.log(req.body);
    const data = Mock.mock({
        'data|1': [
            {
                message: '处理请求成功',
                code: 0,
                success: true,
                data: {}
            },
            {
                message: '处理请求失败，请稍后再试',
                code: 1,
                success: false,
                data: {}
            }
        ]

    })
    res.send(data.data)
}

/**
 * 修改员工考勤信息接口
 */
exports.getMonthInfo = (req, res) => {
    console.log('获取本月员工考勤信息接口响应');
    console.log(req.query);
    const data = Mock.mock({
        'data': {
            'message': '获取成功',
            'code': 0,
            'success': true,
            'data|20': [{
                'id|10000-99999': 66666,
                'name': '@cname',
                'department|1': ['营销部', '技术部', '财务部', '人事部'],
                'post|1': ['经理', '员工'],
                'salary|0-100': 8,
                'sumWorkTime|0-200': 13,
                'sumOverTime|0-200': 0,
                'sumAbsentTime|0-200': 6,
            }]
        }
    })
    res.send(data.data)
}

/**
 * 修改用户密码接口
 */
exports.updatePassword = (req, res) => {
    console.log('修改用户密码接口响应');
    console.log(req.body);
    const data = Mock.mock({
        'data|1': [
            {
                message: '处理请求成功',
                code: 0,
                success: true,
                data: {}
            },
            {
                message: '处理请求失败，请稍后再试',
                code: 1,
                success: false,
                data: {}
            }
        ]

    })
    res.send(data.data)
}


/**
 * 删除用户接口
 */
exports.deleteUser = (req, res) => {
    console.log('删除用户接口响应');
    console.log(req.body);
    const data = Mock.mock({
        'data|1': [
            {
                message: '处理请求成功',
                code: 0,
                success: true,
                data: {}
            },
            {
                message: '处理请求失败，请稍后再试',
                code: 1,
                success: false,
                data: {}
            }
        ]

    })
    res.send(data.data)
}