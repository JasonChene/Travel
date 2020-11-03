import request from '@/utils/request'

/** 用户API开始 */

export function querySysUser(query) {
  return request({
    url: '/competetion/findCompetetionByCondition',
    method: 'get',
    params: query
  })
}

export function addSysUser(data) {
  return request({
    url: '/competetion/addCompetetion',
    method: 'post',
    data
  })
}

export function updateSysUser(data) {
  return request({
    url: '/competetion/updateCompetetion',
    method: 'put',
    data
  })
}

export function deleteSysUser(data) {
  return request({
    url: '/competetion/deleteCompetetionByIds',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function queryRoleName() {
  return request({
    url: '/api/admin/sysrole/queryRoleName',
    method: 'get'
  })
}

export function exportSysUser(data) {
  return request({
    url: '/competetion/exportCompetetion',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/** 用户API结束 */
/** 角色API开始 */

export function querySysRole(query) {
  return request({
    url: '/api/admin/sysrole/querySysRole',
    method: 'get',
    params: query
  })
}

export function addSysRole(data) {
  return request({
    url: '/api/admin/sysrole/addSysRole',
    method: 'post',
    data
  })
}

export function updateSysRole(data) {
  return request({
    url: '/api/admin/sysrole/updateSysRole',
    method: 'put',
    data
  })
}

export function deleteSysRole(data) {
  return request({
    url: '/api/admin/sysrole/deleteSysRole',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function queryRoleNameCheckbox() {
  return request({
    url: '/api/admin/sysrole/queryRoleNameCheckbox',
    method: 'get'
  })
}

export function queryRoleCode() {
  return request({
    url: '/api/admin/sysrole/queryRoleCode',
    method: 'get'
  })
}

export function exportSysRole(data) {
  return request({
    url: '/api/admin/sysrole/exportSysRole',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/** 角色API结束 */
/** URL API开始 */

export function querySysUrl(query) {
  return request({
    url: '/api/admin/sysurl/querySysUrl',
    method: 'get',
    params: query
  })
}

export function addSysUrl(data) {
  return request({
    url: '/api/admin/sysurl/addSysUrl',
    method: 'post',
    data
  })
}

export function updateSysUrl(data) {
  return request({
    url: '/api/admin/sysurl/updateSysUrl',
    method: 'put',
    data
  })
}

export function deleteSysUrl(data) {
  return request({
    url: '/api/admin/sysurl/deleteSysUrl',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function queryRoleIdByUrlId(data) {
  return request({
    url: '/api/admin/sysurl/queryRoleIdByUrlId',
    method: 'get',
    params: {
      urlId: data
    }
  })
}

export function authorizeRoleToUrl(data) {
  return request({
    url: '/api/admin/sysurl/authorizeRoleToUrl',
    method: 'post',
    data
  })
}

export function exportSysUrl(data) {
  return request({
    url: '/api/admin/sysurl/exportSysUrl',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/** URL API结束 */
/** 菜单API开始 */

export function querySysMenu(query) {
  return request({
    url: '/competetiondeclare/findCompetetionDeclareByCondition',
    method: 'get',
    params: query
  })
}

export function addSysMenu(data) {
  return request({
    url: '/api/admin/sysmenu/addSysMenu',
    method: 'post',
    data
  })
}

export function updateSysMenu(data) {
  return request({
    url: '/api/admin/sysmenu/updateSysMenu',
    method: 'put',
    data
  })
}

export function deleteSysMenu(data) {
  return request({
    url: '/api/admin/sysmenu/deleteSysMenu',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function querySysMenuTree() {
  return request({
    url: '/api/admin/sysmenu/querySysMenuTree',
    method: 'get'
  })
}

export function queryMenuIdByRoleId(data) {
  return request({
    url: '/api/admin/sysmenu/queryMenuIdByRoleId',
    method: 'get',
    params: {
      roleId: data
    }
  })
}

export function authorizeMenuToRole(data) {
  return request({
    url: '/api/admin/sysmenu/authorizeMenuToRole',
    method: 'post',
    data
  })
}

export function queryMenuButtonCheckbox() {
  return request({
    url: '/api/admin/sysmenu/queryMenuButtonCheckbox',
    method: 'get'
  })
}

export function queryCheckedMenuButton(data) {
  return request({
    url: '/api/admin/sysmenu/queryCheckedMenuButton',
    method: 'get',
    params: {
      menuCode: data
    }
  })
}

export function querySysMenuButtonTree() {
  return request({
    url: '/api/admin/sysmenu/querySysMenuButtonTree',
    method: 'get'
  })
}

export function queryMenuButtonByRoleCode(data) {
  return request({
    url: '/api/admin/sysmenu/queryMenuButtonByRoleCode',
    method: 'get',
    params: {
      roleCode: data
    }
  })
}

export function authorizeMenuButtonToRole(data) {
  return request({
    url: '/api/admin/sysmenu/authorizeMenuButtonToRole',
    method: 'post',
    data
  })
}

export function queryDataFieldByMenuCode(data) {
  return request({
    url: '/api/admin/sysmenu/queryDataFieldByMenuCode',
    method: 'get',
    params: {
      menuCode: data
    }
  })
}

export function deleteDataField(data) {
  return request({
    url: '/api/admin/sysmenu/deleteDataField',
    method: 'post',
    data
  })
}

export function authorizeMenuDataToRole(data) {
  return request({
    url: '/api/admin/sysmenu/authorizeMenuDataToRole',
    method: 'post',
    data
  })
}

export function exportSysMenu(data) {
  return request({
    url: '/api/admin/sysmenu/exportSysMenu',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/** 菜单API结束 */
/** 机构API开始 */

export function querySysOrg(query) {
  return request({
    url: '/competetioncomment/findCompetetionCommentByCondition',
    method: 'get',
    params: query
  })
}

export function queryOrgType() {
  return request({
    url: '/api/admin/sysorg/queryOrgType',
    method: 'get'
  })
}

export function querySysOrgTree() {
  return request({
    url: '/api/admin/sysorg/querySysOrgTree',
    method: 'get'
  })
}

export function addSysOrg(data) {
  return request({
    url: '/api/admin/sysorg/addSysOrg',
    method: 'post',
    data
  })
}

export function updateSysOrg(data) {
  return request({
    url: '/api/admin/sysorg/updateSysOrg',
    method: 'put',
    data
  })
}

export function deleteSysOrg(data) {
  return request({
    url: '/api/admin/sysorg/deleteSysOrg',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function exportSysOrg(data) {
  return request({
    url: '/api/admin/sysorg/exportSysOrg',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/** 机构API结束 */
/** 字典API开始 */

export function querySysDict(query) {
  return request({
    url: '/api/admin/sysdict/querySysDict',
    method: 'get',
    params: query
  })
}

export function querySysDictTree() {
  return request({
    url: '/api/admin/sysdict/querySysDictTree',
    method: 'get'
  })
}

export function addSysDict(data) {
  return request({
    url: '/api/admin/sysdict/addSysDict',
    method: 'post',
    data
  })
}

export function updateSysDict(data) {
  return request({
    url: '/api/admin/sysdict/updateSysDict',
    method: 'put',
    data
  })
}

export function deleteSysDict(data) {
  return request({
    url: '/api/admin/sysdict/deleteSysDict',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function exportSysDict(data) {
  return request({
    url: '/api/admin/sysdict/exportSysDict',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/** 字典API结束 */
/** 区域API开始 */

export function querySysRegion(query) {
  return request({
    url: '/api/admin/sysregion/querySysRegion',
    method: 'get',
    params: query
  })
}

export function queryRegionType() {
  return request({
    url: '/api/admin/sysregion/queryRegionType',
    method: 'get'
  })
}

export function querySysRegionTree() {
  return request({
    url: '/api/admin/sysregion/querySysRegionTree',
    method: 'get'
  })
}

export function addSysRegion(data) {
  return request({
    url: '/api/admin/sysregion/addSysRegion',
    method: 'post',
    data
  })
}

export function updateSysRegion(data) {
  return request({
    url: '/api/admin/sysregion/updateSysRegion',
    method: 'put',
    data
  })
}

export function deleteSysRegion(data) {
  return request({
    url: '/api/admin/sysregion/deleteSysRegion',
    method: 'post',
    params: {
      regionCode: data
    }
  })
}

export function exportSysRegion(data) {
  return request({
    url: '/api/admin/sysregion/exportSysRegion',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/** 区域API结束 */
/** 参数API开始 */

export function querySysParam(query) {
  return request({
    url: '/api/admin/sysparam/querySysParam',
    method: 'get',
    params: query
  })
}

export function addSysParam(data) {
  return request({
    url: '/api/admin/sysparam/addSysParam',
    method: 'post',
    data
  })
}

export function updateSysParam(data) {
  return request({
    url: '/api/admin/sysparam/updateSysParam',
    method: 'put',
    data
  })
}

export function deleteSysParam(data) {
  return request({
    url: '/api/admin/sysparam/deleteSysParam',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function exportSysParam(data) {
  return request({
    url: '/api/admin/sysparam/exportSysParam',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/** 参数API结束 */
/** 应用API开始 */

export function queryAppClient(query) {
  return request({
    url: '/api/uaa/appclient/queryAppClient',
    method: 'get',
    params: query
  })
}

export function addAppClient(data) {
  return request({
    url: '/api/uaa/appclient/addAppClient',
    method: 'post',
    data
  })
}

export function updateAppClient(data) {
  return request({
    url: '/api/uaa/appclient/updateAppClient',
    method: 'put',
    data
  })
}

export function deleteAppClient(data) {
  return request({
    url: '/api/uaa/appclient/deleteAppClient',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function exportAppClient(data) {
  return request({
    url: '/api/uaa/appclient/exportAppClient',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/** 应用API结束 */
/** 租户API开始 */

export function querySysTenant(query) {
  return request({
    url: '/api/admin/systenant/querySysTenant',
    method: 'get',
    params: query
  })
}

export function addSysTenant(data) {
  return request({
    url: '/api/admin/systenant/addSysTenant',
    method: 'post',
    data
  })
}

export function updateSysTenant(data) {
  return request({
    url: '/api/admin/systenant/updateSysTenant',
    method: 'put',
    data
  })
}

export function deleteSysTenant(data) {
  return request({
    url: '/api/admin/systenant/deleteSysTenant',
    method: 'post',
    params: {
      id: data
    }
  })
}

export function exportSysTenant(data) {
  return request({
    url: '/api/admin/systenant/exportSysTenant',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/** 租户API结束 */
