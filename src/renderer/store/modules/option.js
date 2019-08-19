const state = {
  isWinMax:false,
  title:'群聊助手',
  version:'1.0.0',
  emojiList:[
    {
      id:'qqemoji0',//微笑
      top:'0',
      left:'0',
      content:'<img class=\"qqemoji qqemoji0\" text=\"[微笑]_web\" src=\"/zh_CN/htmledition/v2/images/spacer.gif\" />',
      src:'/static/emoji/emoji1.png'
    },
    {
      id:'emoji1f639',//微笑
      top:'0',
      left:'-30px',
      content:'<img class=\"emoji emoji1f602\" text=\"_web\" src=\"/zh_CN/htmledition/v2/images/spacer.gif\" />',
      src:'/static/emoji/emoji1.png'
    }
  ],
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
