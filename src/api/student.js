import request from '@/utils/request'

//============学生的页面==========
//查询所有
export function findAllStudent() {
  return request({
    url: 'api/student/student/findStudentAll',
    method: 'get',
    // params: query
  })
}

//分页查找
export function findStudentByCondition(query) {
    return request({
      url: 'api/student/student/findStudentByCondition',
      method: 'get',
      params: query
    })
  }

//增加学生
export function addStudentInfo(data) {
    return request({
      url: 'api/student/student/addStudent',
      method: 'post',
      data
    })
  }

//修改学生信息
export function updateStudentInfo(data) {
  return request({
    url: 'api/student/student/updateStudent',
    method: 'put',
    data
  })
}

//删除的方法
export function deleteStudent(data) {
  return request({
    url: 'api/student/student/deleteStudentById',
    method: 'post',
    params: {
      id: data
    }
  })
}
//======项目申报接口======
//查询所有
export function findProjectReportAll() {
  return request({
    url: 'api/student/projectreport/findProjectReportAll',
    method: 'get',
    // params: query
  })
}
//分页查找
export function findProjectReportByCondition(query) {
  return request({
    url: 'api/student/projectreport/findProjectReportByCondition',
    method: 'get',
    params: query
  })
}

//增加项目
export function addProjectReport(data) {
  return request({
    url: 'api/student/projectreport/addProjectReport',
    method: 'post',
    data
  })
}

//修改学生信息
export function updateProjectReport(data) {
return request({
  url: 'api/student/projectreport/updateProjectReport',
  method: 'put',
  data
})
}

//删除的方法
export function deleteProjectReportById(data) {
return request({
  url: 'api/student/projectreport/deleteProjectReportById',
  method: 'post',
  params: {
    id: data
  }
})
}
//导出
export function exportProjectReport(data) {
return request({
  url: 'api/student/projectreport/exportProjectReport',
  method: 'post',
  responseType: 'blob',
  data
})
}
