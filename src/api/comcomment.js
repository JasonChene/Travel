import request from '@/utils/request'




export function queryPageAll(query) {
  return request({
    url: '/api/competetioncomment/competetioncomment/findCompetetionCommentByCondition',
    method: 'get',
    params: query
  })
}

export function updateComComment(data) {
  return request({
    url:'/api/competetioncomment/competetioncomment/updateCompetetionComment',
    method:'put',
    data
  })

}


export function createComComment(data) {
  return request({
    url:'/api/competetioncomment/competetioncomment/addCompetetionComment',
    method:'post',
    data
  })

}


export  function  queryStatus(params) {
  return request({
    url:'/api/competetioncomment/competetioncomment/queryByStatus',
    method:'get',
    params
  })

}

export function deleteComComment(data) {
  return request({
    url: '/api/competetioncomment/competetioncomment/deleteCompetetionCommentByIds',
    method: 'post',
    params: {
      competetionCommentId:data
    }
  })
}


export function exportCompetetionComment(data) {
  return request({
    url: '/api/competetioncomment/competetioncomment/exportCompetetionComment',
    method: 'post',
    responseType: 'blob',
    data
  })
}


