import request from '@/utils/request'

export function uploadFile() {
  return request({
    url: 'cos/upload',
    method: 'post'
  })
}
