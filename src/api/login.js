import request from '@/utils/request'

export function login(username, password) {
  request({
    url: 'admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
