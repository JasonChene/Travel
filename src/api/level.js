import request from '@/utils/request'


export function findLevelByCondition(params) {
  return request({
    url:'/api/competetion/competetion/findLevelByCondition',
    method:'get',
    params
  })

}

export function addNewLevel(data) {
  return request({
    url: '/api/competetion/competetion/addNewLevel',
    method: 'post',
    data
  })
}


export function deleteLevel(data) {
  return request({
    url:'/api/competetion/competetion/deleteLevelById',
    method:'post',
    params:{
      levelId:data
    }
  })

}
