import request from '@/utils/request'

//咨询接口


export function findConsultByCondition(query) {
  return request({
    url: '/api/consulation/consultationreview/findConsultByCondition',
    method: 'get',
    params: query
  })
}
export  function updateConsult(data) {
  return request({
    url: '/api/consulation/consultationreview/updateConsultationReview',
    method: 'put',
    data
  })
}
export  function updateConsults(data) {
  return request({
    url: '/api/consulation/consultationreview/updateConsultationReviews',
    method: 'post',
    data
  })
}
export function deleteConsultById(data) {
  return request({
    url: '/api/consulation/consultationreview/deleteConsultationReviewById',
    method: 'post',
    params: {
      id: data
    }
  })
}
export function deleteConsultByIds(data) {
  return request({
    url: '/api/consulation/consultationreview/deleteConsultationReviewByIds',
    method: 'post',
    params: {
      id: data
    }
  })
}
export function exportConsult(data) {
  return request({
    url: '/api/consulation/consultationreview/exportConsultationReview',
    method: 'post',
    responseType: 'blob',
    data
  })
}
