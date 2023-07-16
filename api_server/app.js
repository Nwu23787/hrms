//导入express
const express = require('express')
const joi = require('joi')

//创建服务器实例
const app = express()

// 在路由之前封装res.cc函数
app.use((req, res, next) => {
    //status默认值为1，表示失败的情况
    // err的值可能是一个错误对象，也可能是一个字符串
    res.cc = function (err, status = 1) {
        res.send({
            status: status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 在路由之前配置解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 导入并配置CORS
const cors = require('cors')
app.use(cors())

//配置解析表单数据的中间件，解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 导入并使用路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

//定义错误级别的中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证错误')
    res.cc('未知的错误')
})

//启动服务器
app.listen(3007, () => {
    console.log('Express server is running at http://127.0.0.1:3007');
})