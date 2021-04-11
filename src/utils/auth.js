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
