const express = require('express')


const router = express.Router()
// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')


/**
 * 以下是人力资源管理的API
 */

router.post('/login', user_handler.login)
router.get('/getInfo', user_handler.getInfo)
router.post('/updateInfo', user_handler.updateInfo)
router.post('/leave', user_handler.leave)
router.post('/transfer', user_handler.transfer)
router.get('/getRequestList', user_handler.getRequestList)
router.post('/handleRequest', user_handler.handleRequest)
router.get('/getStaffInfoList', user_handler.getStaffInfoList)
router.post('/updateStaffInfo', user_handler.updateStaffInfo)
router.post('/getAttendanceInfo', user_handler.getAttendanceInfo)
router.post('/updateAttendance', user_handler.updateAttendance)
router.get('/getMonthInfo', user_handler.getMonthInfo)
router.post('/updatePassword', user_handler.updatePassword)
router.post('/deleteUser', user_handler.deleteUser)

module.exports = router