import request from '@/utils/request'

export function templateList(params) {
  return request({
    url: '/api/Template/list',
    method: 'get',
    params: params
  })
}

export function CloneSpeed(vmId) {
  return request({
    url: `/api/Template/CloneSpeed`,
    method: 'get'
  })
}

export function cloneVm() {
  return request({
    url: '/api/Template/CloneVm',
    method: 'get'
  })
}

export function cloneVmById(vmId) {
  return request({
    url: `/api/Template/Clone/${vmId}`,
    method: 'get'
  })
}

export function vmById(vmId) {
  return request({
    url: `/api/Template/VmById/${vmId}`,
    method: 'get'
  })
}

export function createVm(data) {
  return request({
    url: '/api/Template/Create',
    method: 'post',
    data
  })
}

export function GuestIP(data) {
  return request({
    url: '/api/Template/GuestIP',
    method: 'get',
    params: data
  })
}

export function GuestIPById(data) {
  return request({
    url: '/api/Template/GuestIPById',
    method: 'get',
    params: data
  })
}

export function VmBindUser(data) {
  return request({
    url: '/api/Template/VmBindUser',
    method: 'post',
    data
  })
}

export function vmClone(data) {
  return request({
    url: '/api/VMInfo/VMClone',
    method: 'post',
    data
  })
}
