import request from '@/utils/request'

export function getTeacherList() {
  return request({
    url: '/api/competetion/competetion/findTeacherInfo',
    method: 'get'
  })
}


export function queryListByNameLevel(query) {
  return request({
    url:'/api/competetion/competetion/getCompetetionListFuzzy',
    method: 'get',
    params: query
  })
}


export function findAllLevel() {
  return request({
    url:'/api/competetion/competetion/findAllLevel',
    method:'get'
  })

}


export function findCompetetionByCondition(query) {
  return request({
    url: '/api/competetion/competetion/findCompetetionByCondition',
    method: 'get',
    params: query
  })
}

export function updateCompetetion(data) {
  return request({
    url: '/api/competetion/competetion/updateCompetetion',
    method: 'put',
    data
  })
}


export function deleteCompetetion(data) {
  return request({
    url: '/api/competetion/competetion/deleteCompetetionByIds',
    method: 'post',
    params: {
      id: data
    }
  })
}


export function addCompetetion(data) {
  return request({
    url: '/api/competetion/competetion/addCompetetion',
    method: 'post',
    data
  })
}


