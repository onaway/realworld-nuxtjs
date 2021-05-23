import axios from 'axios';

// axios 创建实例
export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})

export default ({ store }) => {
    // 请求拦截器
    request.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.authorization = `Token ${store.state.user.token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}
