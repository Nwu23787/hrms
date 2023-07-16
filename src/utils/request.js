// 导出一个axios的实例 ,有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
    baseURL: 'http://127.0.0.1:3007',
    timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(

) // 请求拦截器
service.interceptors.response.use(
    response => {
        // 去除axios自动添加的data
        const { success, message, data } = response.data
        if (success) {
            return data
        } else {
            Message.error(message)
            return Promise.reject(new Error(message))
        }
    }, error => {
        Message.error(error.message)
        return Promise.reject(error)
    }
) // 响应拦截器
export default service // 导出axios实例
