import request from '@/utils/request'

export function getAuthorize() {
  return request({
    url: '/api/Authorize/AuthorizeByAll',
    method: 'get'
  })
}

export function authorizeByUserType(userType) {
  return request({
    url: `/api/Login/AuthorizeByUserType/${userType}`,
    method: 'get'
  })
}

export function authorizeList() {
  return request({
    url: '/api/Authorize/List',
    method: 'get'
  })
}

export function updateAuthorize(data) {
  return request({
    url: '/api/Authorize/Update',
    method: 'post',
    data
  })
}
