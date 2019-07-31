import request from '@/utils/request'

export function saveData(data) {
  return request({
    url: 'tness/saveData',
    method: 'post',
    data: data
  })
}

export function getTnessDataByDate(data) {
  return request({
    url: 'tness/getTnessDataByDate',
    method: 'post',
    data: data
  })
}
