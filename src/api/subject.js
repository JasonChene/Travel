import request from '@/utils/request'

//查询所有
export function findAllSubject() {
  return request({
    url: 'api/subject/subject/findSubjectAll',
    method: 'get',
    // params: query
  })
}

//分页查询
export function findSubjectByCondition(query) {
  return request({
    url: 'api/subject/subject/findSubjectByCondition',
    method: 'get',
    params: query
  })
}

//新增学科
export function addSubjectInfo(data) {
  return request({
    url: 'api/subject/subject/addSubject',
    method: 'post',
    data
  })
}
//修改学科信息
export function updateSubjectInfo(data) {
  return request({
    url: 'api/subject/subject/updateSubject',
    method: 'put',
    data
  })
}
//删除学科的方法
export function deleteSubject(data) {
  return request({
    url: 'api/subject/subject/deleteSubjectById',
    method: 'post',
    params: {
      id: data
    }
  })
}
//导出数据
export function exportSubject(data) {
  return request({
    url: 'api/subject/subject/exportSubject',
    method: 'post',
    responseType: 'blob',
    data
  })
}