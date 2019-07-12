import axios from 'axios'
import store from '../store'
import {getToken} from '@/utils/auth'
import {Message, MessageBox} from 'element-ui'
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
  const res = resp.data;
  if ( typeof res === 'string' &&res.indexOf("dataBefore") !== -1) {
      Message({
        message: '账户已禁用，请联系管理员',
        type: 'error',
        duration: 3 * 1000
      });
  }else {
    if (res.code !== 200) {
      // 401:未登录;
      if (res.code === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
    } else {
      return resp.data
    }
  }

}), function (error) {
  console.log(error) // for debug
}


export default instance
