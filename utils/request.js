import axios from 'axios';

// axios 创建实例
const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})

// 请求拦截器

// 响应拦截器

export default request
