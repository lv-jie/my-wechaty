<template>
  <div class="message-line-1">
    <div class="message-line">
      <div class="message-time">{{item.createdAt|dealTime}}</div>
      <div class="message-inner">
        <div class="message-user">
          <img :src="user.avatar" alt="">
        </div>
        <div class="message-content">
          <div class="content" v-if="item.msg_type == 7" v-html="formatimg(item.content)">
          </div>
          <div class="content" v-else-if="item.msg_type == 6">
            <img :src="item.content" alt="" style="width:30%">
          </div>
          <div class="content" v-else>
            该消息类型暂不支持查看
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
  methods:{
    formatimg(text){
      let reg = /^\<img class=\"(qqemoji) ([a-z0-9]*)\".*\/\>$/;
      console.log(text)
      let res = text.match(/<img.*?(?:>|\/>)/g)
      if(res&&res[1]){
        res.forEach(item => {
          let arr = item.match(reg)
          if(arr&&arr[2]){
            text = text.replace(item,`<span class="${arr[1]} ${arr[2]}"></span>`)
          }
        });
      }
      return text
    }
  }
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
          // display: inline-block;
          word-break:break-all;
          line-height: 28px;
          display: flex;

        }
      }
    }
  }
}
</style>