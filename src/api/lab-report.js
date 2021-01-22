import request from '@/utils/request'

export function addScoreInfo(data) {
  return request({
    url: '/api/ScoreInfo/AddScoreInfo',
    method: 'post',
    data
  })
}

export function scoreWork(data) {
  return request({
    url: '/api/ScoreInfo/ScoreWork',
    method: 'post',
    data
  })
}

export function scoreInfoList(data) {
  return request({
    url: '/api/ScoreInfo/ScoreInfoList',
    method: 'post',
    data
  })
}

export function exportScore(data) {
  return request({
    url: '/api/ScoreInfo/ExportScore',
    method: 'post',
    responseType: 'blob',
    data
  })
}

export function viewScoreInfo(groupId) {
  return request({
    url: '/api/ScoreInfo/ViewScoreInfo',
    method: 'get'
  })
}

export function viewScoreInfoForPDF(data) {
  return request({
    url: '/api/Currency/WordToPDF',
    method: 'get',
    params: data
  })
}

export function scoreEcharts(data) {
  return request({
    url: '/api/ScoreInfo/ScoreEcharts',
    method: 'get',
    params: data
  })
}

export function uploadRport(data) {
  return request({
    url: '/api/ScoreInfo/UploadFile',
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    data
  })
}

