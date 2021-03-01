import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/Login/Login',
    method: 'post',
    data
  })
}

export function userList(data) {
  return request({
    url: '/api/UserInfo/UserList',
    method: 'post',
    data
  })
}

export function teacherList(data) {
  return request({
    url: '/api/UserInfo/TeacherList',
    method: 'post',
    data
  })
}

export function updatePwd(data) {
  return request({
    url: '/api/UserInfo/UpdatePwd',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/api/UserInfo/Update',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/api/UserInfo/Create',
    method: 'post',
    data
  })
}

export function resetPwd(userId) {
  return request({
    url: `/api/UserInfo/ResetPwd/${userId}`,
    method: 'get'
  })
}

export function deleteUser(userId) {
  return request({
    url: `/api/UserInfo/Delete/${userId}`,
    method: 'get'
  })
}

export function deleteUserBatch(data) {
  return request({
    url: `/api/UserInfo/BatchDelete`,
    method: 'post',
    data
  })
}

export function teamMember() {
  return request({
    url: '/api/Currency/TeamMember',
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: '/api/Currency/UserInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/Login/LogOut',
    method: 'get'
  })
}

export function getAuthorize() {
  return request({
    url: '/api/Authorize/AuthorizeByAll',
    method: 'get'
  })
}

export function uploadUserInfo(param) {
  return request({
    url: '/api/UserInfo/UploadFile',
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    data:param
  })
}

export function importExcel(filePath) {
  return request({
    url: '/api/UserInfo/ImportExcel',
    method: 'get',
    params: filePath
  })
}
