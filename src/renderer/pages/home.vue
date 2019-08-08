<template>
  <div class="homePage">
    <div>
      <img src="../../../static/icon.png" alt="">
      <div>群聊助手</div>
      <div>版本：{{version}}</div>
      <div>系统：{{platform}}</div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      platform:require('os').platform()
    }
  },
  computed:{
    ...mapState({
      version:({option})=>option.version,
    })
  },
  methods:{
    test(){
      this.$electron.ipcRenderer.send('setInterTray',this.url)
    }
  },
}
</script>
<style lang="less" scoped>
.homePage{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  img{
    width: 256px;
    height: 256px;
  }
}
</style>


