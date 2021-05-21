import { mockLogin, register, login0, login1, logout, getInfo, getAvatar, getRoles } from '@/api/user'
import { getToken, setToken, removeToken, setEmail, getEmail } from '@/utils/auth'
import { resetRouter } from '@/router'
import de from 'element-ui/src/locale/lang/de'
import { MappingGender } from '@/utils'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    email: getEmail(),
    roles: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const allLoginWay = {
      'login0': login0,
      'login1': login1
    }
    const login = allLoginWay['login' + userInfo['way']]
    let data
    switch (userInfo['way']) {
      case 0:
        data = {
          email: userInfo['email'],
          password: userInfo['password']
        }
        break
      case 1:
        data = {
          email: userInfo['email'],
          verify_code: userInfo['verificationCode']
        }
    }
    return new Promise((resolve, reject) => {
        login(data).then(rsp => {
          const { data } = rsp
          console.log(data)
          commit('SET_TOKEN', data.token)
          commit('SET_EMAIL', data.email)
          setToken(data.token)
          setEmail(data.email)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    )
  },

  register({ commit }, userInfo) {
    let data = {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      password: userInfo.password,
      gender: userInfo.gender,
      age: userInfo.age
    }
    return new Promise((resolve, reject) => {
      register(data).then(rsp => {
        const { data } = rsp
        commit('SET_TOKEN', data.token)
        commit('SET_EMAIL', data.email)
        setToken(data.token)
        setEmail(data.email)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  mockLogin({ commit }, userInfo) {
    debugger
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      mockLogin({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

// get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getAvatar({ commit, state }) {
    return new Promise((resolve, reject) => {
      getAvatar({ email: state.email }).then(rsp => {

      }).catch(err => {
        reject(err)
      })
    })
  },

// user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

// remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // 用户角色
  getRoles({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoles({ email: state.email }).then(rsp => {
        const { data } = rsp
        commit('SET_ROLES', data.roles)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

