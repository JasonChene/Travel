import request from '@/utils/request'



export function  findLibByCondition(params) {

  return request({
    url:'/api/lib/lib/findLibByCondition',
    method:'get',
    params
  })
}


export function updateLib(data) {
  return request({
    url:'/api/lib/lib/updateLib',
    method:'put',
    data
  })
}

export function addNewLib(data) {
  return request({
    url:'/api/lib/lib/addLib',
    method:'post',
    data
  })
}

export function findAllOrg() {
  return request({
    url:'/api/lib/lib/findAllOrg',
    method:'get'
  })

}

export function deleteLib(data) {
  return request({
    url:'/api/lib/lib/deleteLibByIds',
    method:'post',
    params:{
      libId:data
    }
  })
}

export function exportLib(data) {
  return request({
    url: '/api/lib/lib/exportLib',
    method: 'post',
    responseType: 'blob',
    data
  })
}
