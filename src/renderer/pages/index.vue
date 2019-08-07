<template>
  <div class="indexPage">
    <el-button type="success" @click="goStart">
      开始使用
    </el-button>
  </div>
</template>
<script>
export default {
  methods:{
    goStart(){
      this.$router.push('/home')
    }
  }
}
</script>
