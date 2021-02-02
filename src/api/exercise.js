import request from '@/utils/request'

export function randomExercises(data) {
  return request({
    url: '/api/Exercises/RandomExercises',
    method: 'get',
    params: data
  })
}

export function computeScore(data) {
  return request({
    url: '/api/Exercises/ComputeScore',
    method: 'post',
    data: data
  })
}