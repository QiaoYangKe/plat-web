import request from '@/utils/request'

export function classInfoList(data) {
  return request({
    url: '/api/ClassInfo/ClassInfoList',
    method: 'post',
    data
  })
}

export function updateClass(data) {
  return request({
    url: '/api/ClassInfo/UpdateClass',
    method: 'post',
    data
  })
}

export function addClass(data) {
  return request({
    url: '/api/ClassInfo/AddClass',
    method: 'get',
    params: data
  })
}

export function classById(data) {
  return request({
    url: `/api/ClassInfo/ClassById/${data}`,
    method: 'get'
  })
}

export function delClass(data) {
  return request({
    url: `/api/ClassInfo/DelClass/${data}`,
    method: 'get'
  })
}

export function classInfoDic() {
  return request({
    url: '/api/ClassInfo/ClassInfoDic',
    method: 'get'
  })
}
