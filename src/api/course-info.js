import request from '@/utils/request'

export function courseList(data) {
  return request({
    url: '/api/CourseInfo/list',
    method: 'post',
    data
  })
}

export function addCourse(data) {
  return request({
    url: '/api/CourseInfo/Add',
    method: 'post',
    data
  })
}

export function updateCourse(data) {
  return request({
    url: '/api/CourseInfo/Update',
    method: 'post',
    data
  })
}

export function videoUpload(data) {
  return request({
    url: '/api/CourseInfo/ChunkUpload',
    method: 'post',
    headers: {'Content-Type':'multipart/form-data', 'Access-Control-Allow-Origin':'*'},
    data
  })
}

export function uploadInstructions(data) {
  return request({
    url: '/api/CourseInfo/UploadFile',
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    data
  })
}

export function uploadTopics(data) {
  return request({
    url: '/api/CourseInfo/UploadFile',
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    data
  })
}

export function fileMerge(data) {
  return request({
    url: '/api/CourseInfo/FileMerge',
    method: 'get',
    params: data
  })
}

export function updateVm(data) {
  return request({
    url: '/api/CourseInfo/UpdataVm',
    method: 'post',
    data
  })
}

export function deleteCourse(id) {
  return request({
    url: `/api/CourseInfo/Delete/${id}`,
    method: 'get'
  })
}

export function teamMenmberByClassDic(classId) {
  return request({
    url: '/api/ClassInfo/TeamMenmberByClassDic',
    method: 'get',
    params: classId
  })
}


export function courseInfoById(id) {
  return request({
    url: `/api/CourseInfo/InfoById/${id}`,
    method: 'get'
  })
}

export function updateCourseState(id) {
  return request({
    url: `/api/CourseInfo/UpdataState/${id}`,
    method: 'get'
  })
}

export function courseDic() {
  return request({
    url: '/api/CourseInfo/Dict',
    method: 'get'
  })
}
