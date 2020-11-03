import request from '@/utils/request'
import { methodOp } from 'codemirror/src/display/operations'

//课程接口

export function findCourseByCondition(query) {
  return request({
    url: '/api/course/course/findCourseByCondition',
    method: 'get',
    params: query
  })
}
export function findCourseCommentById(data) {
return request({
    url:'/api/course/course/findCourseCommentById',
    method:'get',
    params: {
      id: data
    }
  })
}
export function addCourse(data) {
  return request({
    url: '/api/course/course/addCourse',
    method: 'post',
    data
  })
}
export function deleteCourseById(data) {
  return request({
    url: '/api/course/course/deleteCourseById',
    method: 'post',
    params: {
      id: data
    }
  })
}
export function deleteCourseByIds(data) {
  console.log(data)
  return request({
    url: '/api/course/course/deleteCourseByIds',
    method: 'post',
    params: {
      id: data
    }
  })
}
export  function updateCourse(data) {
  return request({
    url: '/api/course/course/updateCourse',
    method: 'put',
    data
  })
}
export function exportCourse(data) {
  return request({
    url: '/api/course/course/exportCourse',
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

