import request from '@/utils/request'

export function menuList(data) {
  return request({
    url: 'wx/menuList',
    method: 'post',
    data: data
  })
}

export function saveOrUpdateMenu(data) {
  return request({
    url: 'wx/saveOrUpdateMenu',
    method: 'post',
    data: data
  })
}

export function delMenu(data) {
  return request({
    url: 'wx/delMenu',
    method: 'post',
    data: data
  })
}

export function createWxMenu(data) {
  return request({
    url: 'wx/createWxMenu',
    method: 'post',
    data: data
  })
}

