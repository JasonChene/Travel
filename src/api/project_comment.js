import request from '@/utils/request'
//项目评论接口


/** 研发工具API开始 */

export function queryprocomAll() {
  return request({
    url: '/api/projectcomment/projectcomment/findProjectCommentAll',
    method: 'get',
    // params: query
  })
}

export function addProcom(data) {
  return request({
    url: '/api/projectcomment/projectcomment/addProjectComment',
    method: 'post',
    data
  })
}

export function updateProcom(data) {
  return request({
    url: '/api/projectcomment/projectcomment/updateProjectComment',
    method: 'put',
    data
  })
}

export function deleteProcom(data) {
  let urls;
  console.log(data)
  console.log(Object.prototype.toString.call(data))
  console.log(data instanceof String)
  if (data.constructor === String) {
    urls='/api/projectcomment/projectcomment/deleteProjectCommentByIds';
  }else{
    urls='/api/projectcomment/projectcomment/deleteProjectCommentById';
  }
  console.log(urls)
  return request({
    url: urls,
    method: 'post',
    params: {
      id: data
    }
  })


}

