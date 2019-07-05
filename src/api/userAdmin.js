import request from '@/utils/request'

export function list() {
  return request({
    url: 'admin/list',
    method: 'post'
  })
}
