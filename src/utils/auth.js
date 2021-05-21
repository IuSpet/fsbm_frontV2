import Cookies from 'js-cookie'

const TokenKey = 'fsbm_user_login_token'
const EmailKey = 'fsbm_user_email'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getEmail() {
  return Cookies.get(EmailKey)
}

export function setEmail(email) {
  return Cookies.set(EmailKey, email)
}

export function removeEmail() {
  return Cookies.remove(EmailKey)
}

/**
 * 判断用户是否有页面权限
 * @param {Array}userRoles
 * @param {Array}pageRoles
 * @return {boolean}
 * @constructor
 */
export function HasAccessRole(userRoles, pageRoles) {
  // console.log(userRoles)
  // console.log(pageRoles)
  if (!pageRoles) {
    return true
  }
  if (pageRoles.length === 0) {
    return true
  }
  for (let i of pageRoles) {
    for (let j of userRoles) {
      if (i === j) return true
    }
  }
  return false
}
