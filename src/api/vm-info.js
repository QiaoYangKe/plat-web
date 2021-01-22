import request from '@/utils/request'

export function VMClone(data) {
  return request({
    url: '/api/Template/VMClone',
    method: 'post',
    data
  })
}

export function GuestIP(vmId) {
  return request({
    url: `/api/Template/VmById/${vmId}`,
    method: 'get'
  })
}

export function VMInfoByUser(data) {
  return request({
    url: '/api/Template/VMlist',
    method: 'post',
    data
  })
}

export function VmById(vmId) {
  return request({
    url: `/api/Template/VmById/${vmId}`,
    method: 'get'
  })
}

export function VMStart(data) {
  return request({
    url: '/api/Template/VMStart',
    method: 'get',
    params: data
  })
}

export function VMStop(data) {
  return request({
    url: '/api/Template/VMStop',
    method: 'get',
    params: data
  })
}

export function VMSuspend(vMId) {
  return request({
    url: `/api/VMInfo/VMSuspend/${vMId}`,
    method: 'get'
  })
}

export function BatchStart(data) {
  return request({
    url: '/api/Template/BatchStart',
    method: 'get',
    params: data
  })
}

export function VMReboot(vMId) {
  return request({
    url: `/api/VMInfo/VMReboot/${vMId}`,
    method: 'get'
  })
}

export function VMRemove(vMId) {
  return request({
    url: `/api/Template/VMRemove/${vMId}`,
    method: 'get'
  })
}

export function VMRebootHost() {
  return request({
    url: '/api/Template/VMRebootHost',
    method: 'get'
  })
}

export function VMRebootNet(data) {
  return request({
    url: '/api/Template/VMRebootNet',
    method: 'get',
    params: data
  })
}

export function CloneVm() {
  return request({
    url: '/api/VMInfo/CloneVm',
    method: 'get'
  })
}
