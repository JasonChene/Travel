import request from '@/utils/request'

export function getCompetetionList() {
  return request({
    url:'/api/competetiondeclare/competetiondeclare/findAllCompetetion',
    method: 'get',
  })
}

export function addCompetetionDeclare(data) {
  return request({
    url:'/api/competetiondeclare/competetiondeclare/addCompetetionDeclare',
    method: 'post',
    data
  })
}

export function updateCompetetionDeclare(data) {
  return request({
    url:'/api/competetiondeclare/competetiondeclare/updateCompetetionDeclare',
    method: 'put',
    data
  })
}

export function getSuggestionInfo(params) {
  return request({
    url:'/api/student/student/findAllStudents',
    method: 'get',
    params
  })
}

export  function  getSuggestionName(params) {
  return request({
    url:'api/student/student/findAllStudentName',
    method:'get',
    params
  })
}


export  function  queryByCondition(params) {
  return request({
    url:'api/competetiondeclare/competetiondeclare/findByfuzzy',
    method:'get',
    params
  })

}

export function deleteDecalre(data) {
  return request({
    url: 'api/competetiondeclare/competetiondeclare/deleteCompetetionDeclareByIds',
    method: 'post',
    params: {
      declareId: data
    }
  })
}


export function queryDeclareByCondition(query) {
  return request({
    url: '/api/competetiondeclare/competetiondeclare/findCompetetionDeclareByCondition',
    method: 'get',
    params: query
  })
}

export function exportCompetetionDeclare(data) {
  return request({
    url: '/api/competetiondeclare/competetiondeclare/exportCompetetionDeclare',
    method: 'post',
    responseType: 'blob',
    data
  })
}

export function finAllStudentInfo() {
  return request({
    url:'/api/student/student/findStudentAll',
    method:'get'
  })
}


export function findAllProject() {
  return request({
    url:'/api/projects/project/findProjectAll',
    method:'get'
  })
}
