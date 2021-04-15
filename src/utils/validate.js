const PwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
const EmailRegex = new RegExp('^[a-z0-9A-Z]+[-|a-z0-9A-Z._]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$')

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/*
 * @param {string} str
 * @returns {Boolean}
 */
export function validEmailAddr(str) {
  return EmailRegex.test(str)
}

/**
 * 验证密码强度
 * @param {string}str
 * @returns {boolean}
 */
export function validPassword(str) {
  return PwdRegex.test(str)
}
