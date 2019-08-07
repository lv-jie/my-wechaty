<template>
  <div class="app-option">
    <div class="top"></div>
    <div class="bottom">
      <button class="my-button">
        <i class="wxicon wx-setting"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.app-option{
  width: 100%;
  height: 100%;
  background: #404040;
  border-radius: 5px 0 0 5px;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  color: #8c8c8c;
  .my-button{
    color: #ccc;
    &:hover{
      color: #fff;
    }
    .wxicon{
      font-size: 20px;
    }
  }
  .bottom{
    padding: 5px;
  }
}
</style>


