import request from '@/utils/request'

export function VMClone(data) {
  return request({
    url: '/api/VMInfo/VMClone',
    method: 'post',
    data
  })
}

export function GuestIP(data) {
  return request({
    url: '/api/VMInfo/GuestIP',
    method: 'post',
    data
  })
}

export function VMInfoByUser(data) {
  return request({
    url: '/api/VMInfo/VMInfoByUser',
    method: 'post',
    data
  })
}

export function VmById(vmId) {
  return request({
    url: `/api/VMInfo/VmById/${vmId}`,
    method: 'get'
  })
}

export function VMStart(data) {
  return request({
    url: '/api/VMInfo/VMStart',
    method: 'get',
    params: data
  })
}

export function VMStop(data) {
  return request({
    url: '/api/VMInfo/VMStop',
    method: 'get',
    params: data
  })
}

export function VMDestroy(vMId) {
  return request({
    url: `/api/VMInfo/VMDestroy/${vMId}`,
    method: 'get'
  })
}

export function VMSuspend(vMId) {
  return request({
    url: `/api/VMInfo/VMSuspend/${vMId}`,
    method: 'get'
  })
}

export function VMResum(vMId) {
  return request({
    url: `/api/VMInfo/VMResum/${vMId}`,
    method: 'get'
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
    url: `/api/VMInfo/VMRemove/${vMId}`,
    method: 'get'
  })
}

export function VMRebootHost() {
  return request({
    url: '/api/VMInfo/VMRebootHost',
    method: 'get'
  })
}

export function VMRebootNet(data) {
  return request({
    url: '/api/VMInfo/VMRebootNet',
    method: 'get',
    params: data
  })
}

export function VMStatusQuery(data) {
  return request({
    url: '/api/VMInfo/VMStatusQuery',
    method: 'get',
    params: data
  })
}


export function BindGroup(data) {
  return request({
    url: '/api/VMManage/BindGroup',
    method: 'post',
    data
  })
}

