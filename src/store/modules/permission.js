import { asyncRoutes, constantRoutes } from '@/router'
import { authorizeByUserType } from '@/api/authorize.js'
import store from '@/store/index.js'
/**
 * Use meta.role to determine if the current user has permission
 * @param authorList
 * @param route
 */
function hasPermission(authorList, route) {
  if (route.meta && route.name) {
    return authorList.some(router => route.name === router.AccessRealName)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param authorList
 */
export function filterAsyncRoutes(routes, authorList) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(authorList, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, authorList)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let authorList = []
      authorizeByUserType(store.getters.roles[0] == null ? 2: store.getters.roles[0]).then(res => {
        authorList = res.data
        console.log(3,authorList)
        let accessedRoutes
        accessedRoutes = filterAsyncRoutes(asyncRoutes, authorList)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
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
