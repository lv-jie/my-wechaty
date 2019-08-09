import db_user from '../../../main/data/user';
const state = {
  loginType:false,
  loginUrl:'',
  userInfo:{}
}


const mutations = {
  SET_LOGIN_TYPE(state,bool){
    state.loginType = bool
  },
  SET_LOGIN_URL(state,url){
    state.loginUrl = url
  },
  SET_USER_INFO(state,obj){
    state.userInfo.id = obj.id?obj.id:state.userInfo.id;
    state.userInfo.wx_id = obj.id?obj.id:state.userInfo.wx_id;
    state.userInfo.name = obj.name?obj.name:state.userInfo.name;
    state.userInfo.avatar = obj.avatar?obj.avatar:state.userInfo.avatar;
    state.userInfo.gender = obj.gender?obj.gender:state.userInfo.gender;
    state.userInfo.signature = obj.signature?obj.signature:state.userInfo.signature;
    state.userInfo.province = obj.province?obj.province:state.userInfo.province;
    state.userInfo.city = obj.city?obj.city:state.userInfo.city;
  }
}

const actions = {
  async setUserInfo({commit},user){
    commit('SET_USER_INFO',user)
    db_user.findOne({wx_id:user.wx_id},(err,res)=>{
      if(!err){
        if(res){
          db_user.update({wx_id:user.wx_id},user,(err,newNum)=>{
            console.log(newNum)
          })
        }else{
          db_user.insert(user,(err,newUser)=>{
            console.log(newUser)
          })
        }
      }
    })
  }
}

export default {
  state,
  mutations,
  actions,
}
