<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'main',
  computed: {
    ...mapState({
      wxLoginType:({bot})=>bot.loginType
    })
  },
  created(){
    console.log(1)
    if(this.wxLoginType){
      console.log(2)
      this.$router.push('/home')
    }else{
      console.log(3)
      this.$router.push('/wxLogin')
    }
    this.$electron.ipcRenderer.on('wx_login',(event, arg)=>{
      this.$router.push('/home')
      console.log(event, arg)
    })
    this.$electron.ipcRenderer.on('wx_logout',(event, arg)=>{
      this.$router.push('/wxLogin')
      console.log(event, arg)
    })
  }
}
</script>
<style scoped>
#app{
  width: 100%;
  height: 100%;
}
</style>

