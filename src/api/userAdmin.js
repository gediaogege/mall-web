import request from '@/utils/request'

export function list() {
  return request({
    url: 'admin/list',
    method: 'post'
  })
}

export function userRoles(data) {
  return request({
    url: 'admin/getUserRoles',
    method: 'post',
    data: data
  })

}

export function saveOrUpdateUser(data) {
  return request({
    url: 'admin/saveOrUpdateUser',
    method: 'post',
    data: data
  })

}

export function roleList() {
  return request({
    url: 'admin/roleList',
    method: 'post'
  })
}

export function rolePermissions(data) {
  return request({
    url: 'admin/rolePermissions',
    method: 'post',
    data: data
  })

}

export function saveOrUpdateRole(data) {
  return request({
    url: 'admin/saveOrUpdateRole',
    method: 'post',
    data: data
  })

}

export function delRole(data) {
  return request({
    url: 'admin/delRole',
    method: 'post',
    data: data
  })

}
export function permissionList(data) {
  return request({
    url: 'admin/permissionList',
    method: 'post',
    data: data
  })

}

export function delPermission(data) {
  return request({
    url: 'admin/delPermission',
    method: 'post',
    data: data
  })

}

export function saveOrUpdatePermission(data) {
  return request({
    url: 'admin/saveOrUpdatePermission',
    method: 'post',
    data: data
  })

}
