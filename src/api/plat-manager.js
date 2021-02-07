import request from '@/utils/request'

export function updateContent(data) {
  return request({
    url: '/api/WebIntroduce/Update',
    method: 'post',
    data: data
  })
}

export function webIntroduce() {
  return request({
    url: '/api/Currency/WebIntroduce',
    method: 'get'
  })
}
