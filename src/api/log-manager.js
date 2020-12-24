import request from '@/utils/request'

export function logInfoList(data) {
  return request({
    url: '/api/LogInfo/LogInfoList',
    method: 'post',
    data
  })
}

export function deleteLogs(data) {
  return request({
    url: '/api/LogInfo/delete',
    method: 'post',
    data
  })
}

export function clearAll() {
  return request({
    url: '/api/LogInfo/ClearAll',
    method: 'get'
  })
}
