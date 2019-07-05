import request from '@/utils/request'

export function login(username, password) {
  return request.request({
    url: 'admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function info() {
  return request({
    url: 'admin/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'admin/logout',
    method: 'get'
  })
}
