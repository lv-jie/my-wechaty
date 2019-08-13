<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: 'app',
  methods:{
    ...mapActions(['initLoginType'])
  },
  created(){
    this.initLoginType()
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

