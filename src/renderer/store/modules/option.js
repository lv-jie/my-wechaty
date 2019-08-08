const state = {
  isWinMax:false,
  title:'群聊助手',
  version:'1.0.0'
}

const mutations = {
  SET_IS_WIN_MAX (state,bool) {
    state.isWinMax = bool
  },
  SET_TITLE (state,title) {
    state.title = title
  },
  SET_VERSION (state,version) {
    state.version = version
  },
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
