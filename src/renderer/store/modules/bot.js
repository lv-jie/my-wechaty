import db_user from '../../../main/data/user';
import db_friend from '../../../main/data/bot_friend';
import db_message from '../../../main/data/bot_message';
const fs=require('fs');
const path = require("path");
const state = {
  loginType:false,
  loginUrl:'',
  userInfo:{},
  friendList:[],
  messageList:[]
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
    state.userInfo.wx_id = obj.wx_id?obj.wx_id:state.userInfo.wx_id;
    state.userInfo.name = obj.name?obj.name:state.userInfo.name;
    state.userInfo.avatar = obj.avatar?obj.avatar:state.userInfo.avatar;
    state.userInfo.gender = obj.gender===false?obj.gender:state.userInfo.gender;
    state.userInfo.signature = obj.signature?obj.signature:state.userInfo.signature;
    state.userInfo.province = obj.province?obj.province:state.userInfo.province;
    state.userInfo.city = obj.city?obj.city:state.userInfo.city;
  },
  SET_FRIEND_LIST(state,list){
    state.friendList = list;
  },
  SET_MESSAGE_LIST(state,list){
    state.messageList = list;
  }
}
const getters = {
  getOneUser:(state)=>(id)=>{
    let user = state.friendList.filter(item=>{
      return item.wx_id ==id
    })
    return user&&user.length?user[0]:{};
  },
  getMessage:(state)=>(id)=>{
    let user = state.messageList.filter(item=>{
      return item.from_id == id ||item.to_id ==id
    })
    return user?user:[];
  }
}
const actions = {
  async setUserInfo({commit},user){
    commit('SET_USER_INFO',user)
    db_user.findOne({wx_id:user.wx_id},(err,res)=>{
      if(!err){
        if(res){
          db_user.update({wx_id:user.wx_id},user,(err,newNum)=>{
            // console.log(newNum)
          })
        }else{
          db_user.insert(user,(err,newUser)=>{
            // console.log(newUser)
          })
        }
      }
    })
  },
  initLoginType({commit}){
    commit('SET_LOGIN_TYPE',null)
  },
  async getFriendList({commit},id){
    console.log(id)
    return new Promise((resolve,reject)=>{
      db_friend.find({user_id:id},function(err,docs){
        if(err){
          reject(err)
        }else{
          resolve(docs)
        }
      })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
