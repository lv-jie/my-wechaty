<template>
  <div class="app-body clearfix">
    <div class="left">
      <app-option></app-option>
    </div>
    <div class="right">
      <div class="header">
        <app-header></app-header>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import appOption from './app-option';
import appHeader from './app-header';
export default {
  name:'app-body',
  components:{
    appOption,
    appHeader
  },
  data() {
    return {
      
    }
  },
}
</script>
<style lang="less" scoped>
.app-body{
  width: 100%;
  height: 100%;
  display: flex;
  .left{
    width: 60px;
    height: 100%;
  }
  .right{
    background: #fff;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 0 5px 5px 0;
    .header{
      height: 50px;
      width: 100%;
    }
    .content{
      width: 100%;
      height: 100%;
    }
  }
}
</style>

