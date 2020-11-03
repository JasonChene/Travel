import request from '@/utils/request'
import qs from 'qs'

/** 模型API开始 */

export function queryModel(query) {
  return request({
    url: '/api/activiti/model/queryModel',
    method: 'get',
    params: query
  })
}

export function addModel(data) {
  return request({
    url: '/api/activiti/model/addModel',
    method: 'post',
    params: data
  })
}

export function updateModel(data) {
  return request({
    url: '/api/activiti/model/updateModel',
    method: 'put',
    params: data
  })
}

export function deployModel(data) {
  return request({
    url: '/api/activiti/model/deployModel',
    method: 'post',
    params: {
      modelId: data
    }
  })
}

export function deleteModel(data) {
  return request({
    url: '/api/activiti/model/deleteModel',
    method: 'post',
    params: {
      modelId: data
    }
  })
}

/** 模型API结束 */
/** 流程API开始 */

export function queryProcessDefinition(query) {
  return request({
    url: '/api/activiti/process/queryProcessDefinition',
    method: 'get',
    params: query
  })
}

export function getProcessResource(deploymentId) {
  return request({
    url: '/api/activiti/process/getProcessImage',
    method: 'post',
    params: { deploymentId }
  })
}

export function getProcessImage(deploymentId) {
  return request({
    url: '/api/activiti/process/getProcessImage',
    method: 'post',
    responseType: 'blob',
    params: { deploymentId }
  })
}

export function getHighLightedProcessDiagram(processInstanceId) {
  return request({
    url: '/api/activiti/process/getHighLightedProcessDiagram',
    method: 'post',
    params: { processInstanceId }
  })
}

export function startProcessInstance(data) {
  return request({
    url: '/api/activiti/process/startProcessInstance',
    method: 'post',
    data
  })
}

export function suspendProcessDefinition(processDefinitionId) {
  return request({
    url: '/api/activiti/process/suspendProcessDefinition',
    method: 'post',
    params: { processDefinitionId }
  })
}

export function activateProcessDefinition(processDefinitionId) {
  return request({
    url: '/api/activiti/process/activateProcessDefinition',
    method: 'post',
    params: { processDefinitionId }
  })
}

export function getDesignProcessResource(data) {
  return request({
    url: '/api/activiti/process/getProcessResource',
    method: 'post',
    params: {
      deploymentId: data
    }
  })
}

export function persistProcess(data) {
  return request({
    url: '/api/activiti/process/persistProcess',
    method: 'post',
    data
  })
}

export function queryProcessInstance(query) {
  return request({
    url: '/api/activiti/process/queryProcessInstance',
    method: 'get',
    params: query
  })
}

export function suspendProcessInstance(processInstanceId) {
  return request({
    url: '/api/activiti/process/suspendProcessInstance',
    method: 'post',
    params: { processInstanceId }
  })
}

export function activateProcessInstance(processInstanceId) {
  return request({
    url: '/api/activiti/process/activateProcessInstance',
    method: 'post',
    params: { processInstanceId }
  })
}

export function deleteProcessInstance(data) {
  return request({
    url: '/api/activiti/process/deleteProcessInstance',
    method: 'post',
    params: {
      processInstanceId: data
    }
  })
}

export function queryExecution(query) {
  return request({
    url: '/api/activiti/process/queryExecution',
    method: 'get',
    params: query
  })
}

/** 流程API结束 */
/** 部署API开始 */

export function queryDeployment(query) {
  return request({
    url: '/api/activiti/deployment/queryDeployment',
    method: 'get',
    params: query
  })
}

export function deleteDeployment(data) {
  return request({
    url: '/api/activiti/deployment/deleteDeployment',
    method: 'post',
    params: {
      deploymentId: data
    }
  })
}

/** 部署API结束 */
/** 任务API开始 */

export function queryTask(query) {
  return request({
    url: '/api/activiti/task/queryTask',
    method: 'get',
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
    params: query
  })
}

export function queryTaskComment(query) {
  return request({
    url: '/api/activiti/task/queryTaskComment',
    method: 'get',
    params: query
  })
}

export function queryUsername() {
  return request({
    url: '/api/activiti/task/queryUsername',
    method: 'get'
  })
}

/** 任务API结束 */
/** 流程任务历史API开始 */

export function queryHistoricProcessInstance(query) {
  return request({
    url: '/api/activiti/history/queryHistoricProcessInstance',
    method: 'get',
    params: query
  })
}

export function deleteHistoricProcessInstance(data) {
  return request({
    url: '/api/activiti/history/deleteHistoricProcessInstance',
    method: 'post',
    params: {
      processInstanceId: data
    }
  })
}

export function queryHistoricActivityInstance(query) {
  return request({
    url: '/api/activiti/history/queryHistoricActivityInstance',
    method: 'get',
    params: query
  })
}

export function queryHistoricDetail(query) {
  return request({
    url: '/api/activiti/history/queryHistoricDetail',
    method: 'get',
    params: query
  })
}

export function queryHistoricVariableInstance(query) {
  return request({
    url: '/api/activiti/history/queryHistoricVariableInstance',
    method: 'get',
    params: query
  })
}

export function queryHistoricTaskInstance(query) {
  return request({
    url: '/api/activiti/history/queryHistoricTaskInstance',
    method: 'get',
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
    params: query
  })
}

export function deleteHistoricTaskInstance(data) {
  return request({
    url: '/api/activiti/history/deleteHistoricTaskInstance',
    method: 'post',
    params: {
      id: data
    }
  })
}

/** 流程任务历史API结束 */
/** 我的办公API开始 */

export function queryPersonalTask(query) {
  return request({
    url: '/api/activiti/task/queryPersonalTask',
    method: 'get',
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
    params: query
  })
}

export function claimTask(taskId) {
  return request({
    url: '/api/activiti/task/claimTask',
    method: 'post',
    params: { taskId }
  })
}

export function completeTask(data) {
  return request({
    url: '/api/activiti/task/completeTask',
    method: 'post',
    params: data
  })
}

export function resolveTask(data) {
  return request({
    url: '/api/activiti/task/resolveTask',
    method: 'post',
    params: data
  })
}

export function delegateTask(data) {
  return request({
    url: '/api/activiti/task/delegateTask',
    method: 'post',
    params: data
  })
}

export function regressTask(data) {
  return request({
    url: '/api/activiti/task/regressTask',
    method: 'post',
    params: data
  })
}

export function rejectTask(data) {
  return request({
    url: '/api/activiti/task/rejectTask',
    method: 'post',
    params: data
  })
}

export function terminateTask(data) {
  return request({
    url: '/api/activiti/task/terminateTask',
    method: 'post',
    params: data
  })
}

/** 我的办公API结束 */
