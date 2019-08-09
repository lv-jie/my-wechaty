<template>
  <div class="app-header">
    <div class="search"></div>
    <div class="title">
      <div class="title-inner text-over">{{title}}</div>
    </div>
    <div class="ctrl">
      <button class="my-button" @click="minimize">
        <i class="wxicon wx-min1"></i>
      </button>
      <button class="my-button" @click="unmaximize" v-if="isWinMax">
        <i class="wxicon wx-max1"></i>
      </button>
      <button class="my-button" @click="maximize" v-else>
        <i class="wxicon wx-plan1"></i>
      </button>
      <button class="my-button close" @click="winClose">
        <i class="wxicon wx-close1"></i>
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
      isWinMax:({option})=>option.isWinMax,
      title:({option})=>option.title,
      userInfo:({bot})=>bot.userInfo
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
    },
    winClose(){
      this.$electron.ipcRenderer.send('win-close',true)
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
  position: relative;
  .title{
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 5px 0;
    z-index: 1000;
    .title-inner{
      max-width: 300px;
      overflow: auto;
      display: inline-block;
    }
  }
  .ctrl{
    -webkit-app-region: no-drag;
    -webkit-user-select:none;
    position: relative;
    z-index: 3000;
    background: #fff;
    .my-button{
      padding: 5px 8px; 
      .wxicon{
        font-size: 11px;
        color: #444;
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

