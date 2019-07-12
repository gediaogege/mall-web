import {login, info, logout} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {login_fun} from "../../utils/request";

const user = {
  state: {
    token: getToken(),
    username: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    }
  },
  actions: {
    Login({commit}, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(function (response) {
          console.log(response);
          const data = response.data;
          const tokenStr = data.tokenHead + data.token;
          setToken(tokenStr);
          commit('SET_TOKEN', tokenStr);
          resolve()
        }).catch(function (error) {
          reject(error)
        })
      })

    },
    //获取当前登录用户信息
    GetInfo({commit}) {
      return new Promise((resolve, reject) => {
        info().then(response => {
          const data = response.data;
          if (data) {
            commit('SET_USERNAME', data)
          } else {
            reject('getInfo: username must be a non-null string !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //注销
    LogOut({commit}) {
      return new Promise((resolve, reject) => {
        logout().then(resp => {
          commit('SET_TOKEN', '');
          commit('SET_USERNAME', '');
          removeToken();
          resolve(resp)
        }).catch(error => {
          reject(error())
        })
      })
    }
    ,
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_USERNAME', '');
        removeToken();
        resolve()
      })
    }

  }
};
export default user
