<template>
  <div class="indexPage">
    <app-header></app-header>
    <el-button type="success" @click="goStart">开始使用</el-button>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import appHeader from '../components/app/app-header'
export default {
  components:{
    appHeader
  },
  computed: {
    ...mapState({
      wxLoginType:({bot})=>bot.loginType
    })
  },
  methods:{
    goStart(){
      if(this.wxLoginType===null){
        // console.log('初始化中')
        this.$router.push('/message')
      }else if(this.wxLoginType){
        this.$router.push('/home')
      }else{
        this.$router.push('/wxLogin')
      }
    }
  }
}
</script>
