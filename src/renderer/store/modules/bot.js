import db_user from '../../../main/data/user';
import db_friend from '../../../main/data/bot_friend';
import db_message from '../../../main/data/bot_message';
const fs=require('fs');
const path = require("path");
const state = {
  loginType:false,
  loginUrl:'',
  userInfo:{},
  friendList:[]
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
  },
  initLoginType({commit}){
    commit('SET_LOGIN_TYPE',null)
  },
  async getAllFriend({commit},bot){
    let id = bot.userSelf().id
    let list;
    let res;
    let resList = []
    try {
      list = await bot.Contact.findAll()
      res = list.forEach(async (item,index)=>{
        const file = await item.avatar()
        let name = file.name;
        let avatarPath = path.join(__static,`/avatar/${name}`);
        let userInfo = {
          wx_id:item.id,
          user_id:id,
          name:item.payload.name,
          alias:item.payload.alias,
          avatar:`/avatar/${name}`,
          gender:item.payload.gender,
          signature:item.payload.signature,
          province:item.payload.province,
          city:item.payload.city,
        }
        fs.exists(avatarPath,async (flag)=>{
          if(flag){
            console.log("文件存在");
          }else{
            console.log("文件不存在");
            await file.toFile(avatarPath);
          }
        })
        db_friend.findOne({wx_id:userInfo.wx_id},(err,res)=>{
          if(!err){
            if(res){
              db_message.find({$or:[{form_id:userInfo.wx_id},{to_id:userInfo.wx_id}]}).sort({time:-1}).exec(function (err, docs){
                let temp
                if(docs.length){
                  console.log(docs)
                  temp = {
                    ...userInfo,
                    msg_time:docs[0].time,
                    msg_content:docs[0].content
                  }
                }else{
                  temp = {
                    ...userInfo,
                    msg_time:0,
                    msg_content:''
                  }
                }
                db_friend.update({wx_id:userInfo.wx_id},temp,(err,newNum)=>{
                  // console.log(newNum)
                  if(index==list.length-1){
                    db_friend.find({},(err,allList)=>{
                      commit('SET_FRIEND_LIST',allList)
                    })
                  }
                })
              })
              
            }else{
              db_friend.insert(userInfo,(err,newUser)=>{
                // console.log(newUser)
                if(index==list.length-1){
                  db_friend.find({},(err,allList)=>{
                    commit('SET_FRIEND_LIST',allList)
                  })
                }
              })
            }
            // if(res){
            //   db_friend.remove({_id:res._id},{},(e,numRemoved)=>{
            //     // console.log(numRemoved)
            //   })
            // }
            // db_friend.update({wx_id:userInfo.wx_id},userInfo,(err,newNum)=>{
            //   // console.log(newNum)
            // })
          }
        })
      })
    } catch (error) {
      console.log('error',error)
    }
    commit('SET_FRIEND_LIST',list)
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
}
