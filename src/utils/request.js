import axios from 'axios'

// 全局配置
const service = axios.create({
  baseURL:"http://localhost:8080", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

//请求拦截器
service.interceptors.request.use(function(config){


  config.headers.token = "xx";

  return config;
})

// 响应拦截器
service.interceptors.response.use(function(res){

  return res.data;
})

export default service
