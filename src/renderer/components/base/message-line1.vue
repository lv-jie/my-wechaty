<template>
  <div class="message-line-1">
    <div class="message-line">
      <div class="message-time">{{item.createdAt|dealTime}}</div>
      <div class="message-inner">
        <div class="message-user">
          <img :src="user.avatar" alt="">
        </div>
        <div class="message-content">
          <div class="content" v-if="item.msg_type == 7" v-html="item.content">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    user:{
      type:Object,
      default(){
        return {}
      }
    },
    item:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      
    }
  },
}
</script>
<style lang="less" scoped>
.message-line-1{
  padding: 10px;
  .message-line{
    .message-time{
      text-align: center;
    }
    .message-inner{
      overflow: hidden;
      .message-user{
        float: left;
        width: 35px;
        height: 35px;
        border-radius: 2px;
        overflow: hidden;
        margin-right: 8px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .message-content{
        float: left;
        max-width: 60%;
        display: inline-block;
        position: relative;
        background: #fff;
        // border: 1px solid #ececec;
        border-radius:3px; 
        padding: 5px;
        .content{
          display: inline-block;
          word-break:break-all;
        }
      }
    }
  }
}
</style>