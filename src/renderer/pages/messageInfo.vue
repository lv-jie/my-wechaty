<template>
  <div class="message-info">
    <div class="message-header">{{user.name}}</div>
    <div class="message-history">
      <div v-for="(item,index) in messageList" :key="`messageInfo-${$route.params.id}-${index}`">
        <message-line-1 v-if="item.from_id" :user='user' :item="item"></message-line-1>
        <message-line-2 v-else-if="item.to_id" :item="item"></message-line-2>
      </div>
    </div>
    <div class="message-text">
      <send-box></send-box>
    </div>
  </div>
</template>
<script>
import messageLine1 from '../components/base/message-line1';
import messageLine2 from '../components/base/message-line2';
import sendBox from '../components/base/sendBox';
export default {
  components:{sendBox,messageLine1,messageLine2},
  data() {
    return {
      
    }
  },
  computed:{
    user(){
      return this.$store.getters.getOneUser(this.$route.params.id)
    },
    messageList(){
      return this.$store.getters.getMessage(this.$route.params.id)
    }
  },
  created(){
  },
  watch:{
    '$route.params.id':(newVal,oldVal)=>{
      console.log(newVal,oldVal)
    }
  }
}
</script>
<style lang="less" scoped>
.message-info{
  width: 100%;
  height: 100%;
  .message-header{
    text-align: center;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    color: #111;
    border-bottom:1px solid #ececec; 
  }
  .message-history{
    height: calc(100% - 220px);
    overflow-y: auto;
    overflow-x: hidden;
    background: #f5f5f5;
  }
}
</style>
