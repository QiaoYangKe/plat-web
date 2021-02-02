import request from '@/utils/request'

export function studentScore(data) {
  return request({
    url: '/api/StudentScore/StudentList',
    method: 'post',
    data
  })
}

export function scoreList(data) {
    return request({
      url: '/api/StudentScore/ScoreList',
      method: 'get',
      params: data
    })
}

export function statistics(data) {
    return request({
      url: '/api/StudentScore/Statistics',
      method: 'post',
      data
    })
}