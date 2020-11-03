import request from '@/utils/request'

//查询所有
export function findAllTeacher() {
  return request({
    url: 'api/teacher/teacher/findTeacherAll',
    method: 'get',
    // params: query
  })
}

//分页查询
export function findTeacherByCondition(query) {
    return request({
      url: 'api/teacher/teacher/findTeacherByCondition',
      method: 'get',
      params: query
    })
}
//条件查询
export function findTeacherByTable(query) {
  return request({
    url: 'api/teacher/teacher/findTeacherByTable',
    method: 'get',
    params: query
  })
}

//新增导师
export function addTeacherInfo(data) {
  return request({
    url: 'api/teacher/teacher/addTeacher',
    method: 'post',
    data
  })
}
//修改导师信息
export function updateTeacherInfo(data) {
  return request({
    url: 'api/teacher/teacher/updateTeacher',
    method: 'put',
    data
  })
}
//删除的方法
export function deleteTeacher(data) {
  return request({
    url: 'api/teacher/teacher/deleteTeacherById',
    method: 'post',
    params: {
      id: data
    }
  })
}