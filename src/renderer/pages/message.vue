<template>
  <div class="messagePage">
    <div class="tabs">
      <my-tabs v-model='activeId' :list='friendList'></my-tabs>
    </div>
    <div class="line"></div>
    <div class="message">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import myTabs from '../components/base/tabs';
import {mapState} from 'vuex';
export default {
  components:{
    myTabs
  },
  data() {
    return {
      activeId:'',
      list:[]
    }
  },
  computed:{
    ...mapState({
      friendList:({bot})=>bot.friendList
    })
  },
  methods:{
    getFriendList(){
      console.log(this.userInfo)
      db_friend.find({user_id:this.userInfo.wx_id},(err,res)=>{
        if(err){
          console.log('err---',err)
        }else{
          this.list = res
        }
      })
    }
  },
  created(){
    // this.getFriendList()
  },
}
</script>
<style lang="less" scoped>
.messagePage{
  width: 100%;
  height: 100%;
  display: flex;
  &>*{
    height: 100%;
  }
  .tabs{
    width: 275px;
  }
  .line{
    width: 1px;

  }
}
</style>
