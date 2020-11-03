import request from '@/utils/request'
//训练计划接口


/** 研发工具API开始 */

export function queryplanAll() {
  return request({
    url: '/api/plan/plan/findPlanAll',
    method: 'get',
    // params: query
  })
}

export function addPlan(data) {
  return request({
    url: '/api/plan/plan/addPlan',
    method: 'post',
    data
  })
}

export function updatePlan(data) {
  return request({
    url: '/api/plan/plan/updatePlan',
    method: 'put',
    data
  })
}

export function deletePlan(data) {
  let urls;
  console.log(data)
  console.log(Object.prototype.toString.call(data))
  console.log(data instanceof String)
  if (data.constructor === String) {
    urls='/api/plan/plan/deletePlanByIds';
  }else{
    urls='/api/plan/plan/deletePlanById';
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

export function generateResource(id) {
  return request({
    url: '/api/generator/generator/generateResource',
    method: 'post',
    responseType: 'blob',
    params: { id }
  })
}

export function exportGenerator(data) {
  return request({
    url: '/api/generator/generator/exportGenerator',
    method: 'post',
    responseType: 'blob',
    data
  })
}