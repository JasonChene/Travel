import request from '@/utils/request'

//资讯接口


export function findNewsByCondition(query) {
  return request({
    url: '/api/news/news/findNewsByCondition',
    method: 'get',
    params: query
  })
}
export function addNews(data) {
  return request({
    url: '/api/news/news/addNews',
    method: 'post',
    data
  })
}
export  function updateNews(data) {
  return request({
    url: '/api/news/news/updateNews',
    method: 'put',
    data
  })
}
export function deleteNewsById(data) {
  return request({
    url: '/api/news/news/deleteNewsById',
    method: 'post',
    params: {
      id: data
    }
  })
}
export function deleteNewsByIds(data) {
  return request({
  url: '/api/news/news/deleteNewsByIds',
  method: 'post',
  params: {
    id: data
  }
})
}
export function exportNews(data) {
  return request({
    url: '/api/news/news/exportNews',
    method: 'post',
    responseType: 'blob',
    data
  })
}
//获取老师id
export function getTeacherId() {
  return request({
    url: '/api/teacher/teacher/findTeacherAll',
    method: 'get'
  })
}

//资讯类型
export function findNewsTypeByCondition(query) {
  return request({
    url: '/api/newstype/newstype/findNewsTypeByCondition',
    method: 'get',
    params: query
  })
}
export function findNewsTypeAll() {
  return request({
    url: '/api/newstype/newstype/findNewsTypeAll',
    method: 'get'
  })
}
export function findNewsTypeByName(data) {
  return request({
    url: '/api/newstype/newstype/findNewsTypeByName',
    method: 'get',
    params: {
      typeName: data
    }
  })
}
export function addNewsType(data) {
  return request({
    url: '/api/newstype/newstype/addNewsType',
    method: 'post',
    data
  })
}
export function deleteNewsTypeById(data) {
  return request({
    url: '/api/newstype/newstype/deleteNewsTypeById',
    method: 'post',
    params: {
      id: data
    }
  })
}
export function deleteNewsTypeByIds(data) {
  return request({
    url: '/api/newstype/newstype/deleteNewsTypeByIds',
    method: 'post',
    params: {
      id: data
    }
  })
}
export  function updateNewsType(data) {
  return request({
    url: '/api/newstype/newstype/updateNewsType',
    method: 'put',
    data
  })
}
export function exportNewsType(data) {
  return request({
    url: '/api/newstype/newstype/exportNewsType',
    method: 'post',
    responseType: 'blob',
    data
  })
}

//资讯评论
export function findNewsCommentByCondition(query) {
  return request({
    url: '/api/newscomment/newscomment/findNewsCommentByCondition',
    method: 'get',
    params: query
  })
}
export  function updateNewsComment(data) {
  return request({
    url: '/api/newscomment/newscomment/updateNewsComment',
    method: 'put',
    data
  })
}
export function deleteNewsCommentById(data) {
  return request({
    url: '/api/newscomment/newscomment/deleteNewsCommentById',
    method: 'post',
    params: {
      id: data
    }
  })
}
export function deleteNewsCommentByIds(data) {
  return request({
    url: '/api/newscomment/newscomment/deleteNewsCommentByIds',
    method: 'post',
    params: {
      id: data
    }
  })
}
export function exportNewsComment(data) {
  return request({
    url: '/api/newscomment/newscomment/exportNewsComment',
    method: 'post',
    responseType: 'blob',
    data
  })
}
