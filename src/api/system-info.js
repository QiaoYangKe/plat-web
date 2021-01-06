import request from '@/utils/request'

export function getSystemData() {
  return request({
    url: '/api/System/GetSystemData',
    method: 'get'
  })
}

export function getSystemEcharsData() {
  return request({
    url: '/api/System/GetSystemEcharsData',
    method: 'get'
  })
}