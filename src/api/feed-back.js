import request from '@/utils/request'

export function lessonList() {
  return request({
    url: '/api/FeedBackInfo/LessonList',
    method: 'get'
  })
}

export function addFeedBack(data) {
  return request({
    url: '/api/FeedBackInfo/AddFeedBack',
    method: 'post',
    data
  })
}

export function getFeedBackInfos(data) {
  return request({
    url: '/api/FeedBackInfo/GetFeedBackInfos',
    method: 'post',
    data
  })
}

export function readFeedBack(groupId) {
  return request({
    url: `/api/FeedBackInfo/ReadFeedBack`,
    method: 'get',
    params: groupId
  })
}

export function uploadFileFeedBack(files) {
  return request({
    url: '/api/FeedBackInfo/UploadFile',
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    data: files
  })
}
