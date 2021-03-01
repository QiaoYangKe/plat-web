import request from '@/utils/request'

export function dataBackup() {
  return request({
    url: '/api/DataBackup/DataBackup',
    method: 'get'
  })
}

export function dataBackList(data) {
  return request({
    url: '/api/DataBackup/list',
    method: 'post',
    data
  })
}

export function deleteData(data) {
  return request({
    url: '/api/DataBackup/DeleteData',
    method: 'post',
    data
  })
}