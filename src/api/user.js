import request from '@/utils/request'

export function login(data) {
  data['scope'] = 'ui'
  data['grant_type'] = 'password'
  data['client_id'] = 'browser'
  data['type'] = 'account'
  return request({
    url: '/api/uaa/oauth/token',
    method: 'post',
    headers: { 'Authorization': 'Basic YnJvd3Nlcjo=', 'Content-Type': 'application/x-www-form-urlencoded' },
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/uaa/users/getSysUser',
    method: 'get'
  })
}

export function compareCaptcha(data) {
  return request({
    url: '/api/account/sysuserdetail/compareCaptcha',
    method: 'post',
    params: {
      charCaptcha: data
    }
  })
}
