<template>
  <div class="tabsPage">
    <ul class="tab-list">
      <li class="tab-list-item" v-for="(item,index) in list" :key="index" :class="{active:value==item.id}" @click="goChild(item)">
        <div>
          {{item.name}}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props:{
    list:{
      type:Array,
      default:()=>[]
    },
    value:{
      type:String,
      default:''
    }
  },
  methods:{
    goChild(item){
      this.$router.push({
        path:`${this.$route.path}/${item.id}`,
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tabsPage{
  width: 100%;
  height: 100%;
  background: #e6e5e5;
  .tab-list{
    .tab-list-item:hover{
      background: #d8d8d8;
    }
    .tab-list-item.active{
      background: #c9c7c6;
    }
  }
}
</style>

