<template>
  <div class="app-header">
    <div class="search"></div>
    <div class="title"></div>
    <div class="ctrl">
      <button class="my-button" @click="minimize">
        <i class="wxicon wx-min"></i>
      </button>
      <button class="my-button" @click="unmaximize" v-if="isWinMax">
        <i class="wxicon wx-max"></i>
      </button>
      <button class="my-button" @click="maximize" v-else>
        <i class="wxicon wx-plan"></i>
      </button>
      <button class="my-button close">
        <i class="wxicon wx-close"></i>
      </button>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      
    }
  },
  computed:{
    ...mapState({
      isWinMax:({option})=>option.isWinMax
    })
  },
  methods:{
    minimize(){
      this.$electron.ipcRenderer.send('minimize',true)
    },
    maximize(){
      this.$electron.ipcRenderer.send('maximize',true)
    },
    unmaximize(){
      this.$electron.ipcRenderer.send('unmaximize',true)
    }
  }
}
</script>
<style lang="less" scoped>
.app-header{
  width: 100%;
  height: 100%;
  border-bottom:1px solid #eee; 
  display: flex;
  justify-content: space-between;
  -webkit-app-region: drag;
  .ctrl{
    -webkit-app-region: no-drag;
    .my-button{
      padding: 5px 8px; 
      .wxicon{
        font-size: 14px;
        color: #333;
      }
      &:hover{
        background: #e3e3e3;
      }
    }
    .close:hover{
      background: #f74040;
      .wxicon{
        color: #FFF;
      }
    }
    
  }
}
</style>

