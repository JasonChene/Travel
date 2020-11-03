import request from '@/utils/request'

/** 研发工具API开始 */

export function queryGenerator() {
  return request({
    url: '/api/coursecomment/coursecomment/findCourseCommentAll',
    method: 'get',
    // params: query
  })
}

export function addGenerator(data) {
  return request({
    url: '/api/coursecomment/coursecomment/addCourseComment',
    method: 'post',
    data
  })
}

export function updateGenerator(data) {
  return request({
    url: '/api/coursecomment/coursecomment/updateCourseComment',
    method: 'put',
    data
  })
}

export function deleteGenerator(data) {
  let urls;
  console.log(data)
  console.log(Object.prototype.toString.call(data))
  console.log(data instanceof String)
  if (data.constructor === String) {
    urls='/api/coursecomment/coursecomment/deleteCourseCommentByIds';
  }else{
    urls='/api/coursecomment/coursecomment/deleteCourseCommentById';
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



/** 研发工具API结束 */
