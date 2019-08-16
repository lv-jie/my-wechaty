<template>
  <div class="app-option">
    <div class="top">
      <div class="user">
        <img :src="`${userInfo.avatar}`" alt="">
      </div>
      <button class="my-button" title="消息" @click="goRouter('/message')">
        <i class="wxicon wx-message"></i>
      </button>
      <button class="my-button" title="群聊" @click="goRouter('/room')">
        <i class="wxicon wx-message1"></i>
      </button>
    </div>
    <div class="bottom">
      <button class="my-button" @click="goRouter('/tip')">
        <i class="wxicon wx-tip"></i>
      </button>
      <button class="my-button" @click="goRouter('/setting')">
        <i class="wxicon wx-setting"></i>
      </button>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
const path = require('path')
export default {
  computed:{
    ...mapState({
      userInfo:({bot})=>bot.userInfo
    })
  },
  methods: {
    goRouter(url){
      this.$router.push(url)
    },
    getStatic(url){
      return path.join(__static,url)
    }
  },
}
</script>
<style lang="less" scoped>
.app-option{
  width: 100%;
  height: 100%;
  background: #404040;
  border-radius: 5px 0 0 5px;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  color: #8c8c8c;
  .my-button{
    color: #ccc;
    padding: 5px 0;
    &:hover{
      color: #fff;
    }
    .wxicon{
      font-size: 20px;
    }
  }
  .top{
    display: flex;
    flex-direction: column;
    align-items:center;
    padding: 8px 0;
    .user{
      overflow: hidden;
      border-radius: 2px;
      width: 40px;
      display: inline-block;
      img{
        width: 100%;
      }
    }
  }
  .bottom{
    display: flex;
    flex-direction: column;
    padding: 5px;
  }

}
</style>


