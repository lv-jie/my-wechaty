<template>
  <div class="tabsPage">
    <ul class="tab-list">
      <li class="tab-list-item" v-for="(item,index) in list" :key="index" :class="{active:value==item.wx_id}" @click="goChild(item)">
        <div class="item-img">
          <img :src="`../../../static/${item.avatar}`" alt="">
        </div>
        <div class="item-text">
          <div class="item-name text-over">{{item.name}}</div>
          <div class="item-msg text-over">{{item.msg}}</div>
        </div>
        <div class="item-time">
          {{item.time}}
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
      console.log(item.wx_id)
      this.$emit('input', item.wx_id)
      if(/^message/.test(this.$route.name)){
        this.$router.push({
          name:'messageInfo',
          params:{id: item.wx_id}
        })
      }else {
        console.log(this.$route)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tabsPage{
  width: 100%;
  height: 100%;
  overflow-y:auto;
  background: #e6e5e5;
  padding: 2px 0;
  .tab-list{
    .tab-list-item:hover{
      background: #d8d8d8;
    }
    .tab-list-item.active{
      background: #c9c7c6;
    }
    .tab-list-item{
      display: flex;
      padding: 10px; 
      .item-img{
        width: 45px;
        overflow: hidden;
        border-radius:3px; 
        img{
          width: 100%;
        }
      }
      .item-text{
        padding-left: 10px;
        width: 175px;
        &>*{
          width: 100%;
        }
      }
    }
  }
}
</style>

