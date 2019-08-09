<template>
  <div class="messagePage">
    <div class="tabs">
      <my-tabs v-model='activeId' :list='list'></my-tabs>
    </div>
    <div class="line"></div>
    <div class="message">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import myTabs from '../components/base/tabs'
export default {
  components:{
    myTabs
  },
  data() {
    return {
      activeId:'',
      list:[
        { 
          id:'asdafqweqweads',
          name:'张三',
          wx_id:'aasdadasdasda',
          message:{
            text:'asdasdad',
            time:'2019-08-09T08:09:08.398Z'
          }
        }
      ]
    }
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
}
</style>
