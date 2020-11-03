import request from '@/utils/request'


export  function  queryAllOrg(params) {
  return request({
    url:'/api/lib/lib/queryAllOrg',
    method:'get',
    params
  })

}

export function updateOrg(data) {
  return request({
    url: '/api/lib/lib/updateOrg',
    method: 'put',
    data
  })

}

export function  addOrg(data) {
  return request({
    url:'/api/lib/lib/addOrg',
    method:'post',
    data
  })

}

export function deleteOrg(data) {
  return request({
    url:'/api/lib/lib/deleteOrg',
    method:'post',
    params:{
      orgId:data
    }
  })

}
