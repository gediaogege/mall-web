import axios from 'axios'
import store from '../store'
import {getToken} from '@/utils/auth'
//创建axios实例
const instance = axios.create(
  {
    baseURL: 'http://localhost:8080/mall/',
    timeout: 10000
  }
);
//请求拦截器
instance.interceptors.request.use(function (config) {
  //当store容器中已经有token，那么在每次请求都在请求头加上token
  if (store.getters.token) {
    config.headers['Authorization'] = getToken();
  }
  return config;
}), function (error) {
  console.log(error) // for debug
};

//响应拦截
instance.interceptors.response.use(function (resp) {
  const respData = resp.data;
  if (respData.code != 200) {
    alert('服务器异常')
  }
}), function (error) {
  console.log(error) // for debug
}
export default instance
