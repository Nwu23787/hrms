//设置token
import Cookies from 'js-cookie'

const TokenKey = 'hrms_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(obj) {
  Cookies.set(TokenKey, obj.token)
  Cookies.set('id', obj.id)
  Cookies.set('username', obj.username)
  Cookies.set('isAdmin', obj.isAdmin)
  return
}

export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove('id')
  Cookies.remove('name')
  Cookies.remove('isAdmin')
  return
}
