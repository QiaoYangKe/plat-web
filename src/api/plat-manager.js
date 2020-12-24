import request from '@/utils/request'

export function updateContent(data) {
  return request({
    url: '/api/WebIntroduce/Update',
    method: 'get',
    params: data
  })
}
