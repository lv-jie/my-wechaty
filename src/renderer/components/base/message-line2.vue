<template>
  <div class="message-line-2">
    <div class="message-line">
      <div class="message-time">{{item.createdAt|dealTime}}</div>
      <div class="message-inner">
        <div class="message-user">
          <img :src="userInfo.avatar" alt="">
        </div>
        <div class="message-content">
          <div class="content" v-if="item.msg_type == 7">
            {{item.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  props:{
    item:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    ...mapState({
      userInfo:({bot})=>bot.userInfo
    })
  },
  data() {
    return {
      
    }
  },
}
</script>
<style lang="less" scoped>
.message-line-2{
  padding: 10px;
  .message-line{
    .message-time{
      text-align: center;
    }
    .message-inner{
      overflow: hidden;
      .message-user{
        float: right;
        flex-shrink:0;
        width: 35px;
        height: 35px;
        border-radius: 2px;
        overflow: hidden;
        margin-left: 8px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .message-content{
        float: right;
        max-width: 60%;
        display: inline-block;
        position: relative;
        background: #9eea6a;
        // border: 1px solid #ececec;
        border-radius:3px; 
        padding: 6px;
        .content{
          display: inline-block;
          word-break:break-all;
        }
      }
    }
  }
}
</style>