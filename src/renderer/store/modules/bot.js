const state = {
  loginType:false,
  loginUrl:''
}

const mutations = {
  SET_LOGIN_TYPE(state,bool){
    state.loginType = bool
  },
  SET_LOGIN_URL(state,url){
    state.loginUrl = url
  },
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
