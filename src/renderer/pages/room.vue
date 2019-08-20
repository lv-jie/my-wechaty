<template>
  <div class="messagePage">
    <div class="tabs">
      <my-tabs v-model='activeId' :list='roomList'></my-tabs>
    </div>
    <div class="line"></div>
    <div class="message">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import myTabs from '../components/base/tabs';
import {mapState} from 'vuex';
export default {
  components:{
    myTabs
  },
  data() {
    return {
      activeId:'',
      list:[]
    }
  },
  computed:{
    ...mapState({
      roomList:({bot})=>bot.roomList
    })
  },
  methods:{
  },
  created(){
    // this.getFriendList()
  },
}
</script>
<style lang="less" scoped>
.messagePage{
  width: 100%;
  height: 100%;
  display: flex;
  &>*{
    height: 100%;
  }
  .tabs{
    width: 275px;
  }
  .line{
    width: 1px;
  }
  .message{
    width: calc(100% - 276px);
  }
}
</style>
