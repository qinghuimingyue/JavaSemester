import axios from 'axios';

// 创建 axios 实例
const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL || 'http://localhost:5000/api', // 后端API的基础URL
    timeout: 10000, // 设置请求超时
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken'); // 从 localStorage 获取 JWT Token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器：处理错误响应
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token 失效，跳转到登录页面
            localStorage.removeItem('jwtToken');
            window.location.href = '/login'; // 跳转到登录页面
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
