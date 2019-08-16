<template>
  <div class="send-box">
    <div class="send-bar">
      <div>
        <i class="wxicon wx-biaoqing"></i>
      </div>
      <div>
        <i class="wxicon wx-picture"></i>
      </div>
      <div>
        AI
      </div>
    </div>
    <div class="send-eidt">
      <!-- <textarea name="" id="" cols="30" rows="3" class="text-box"></textarea> -->
      <div class="text-box" contenteditable="true" placeholder="" tabindex="0" dir="ltr" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
        <img class="img" src="C:\Users\Administrator\AppData\Roaming\Electron\avatar\测试测试-avatar.jpg" alt="">
      </div>
    </div>
    <div class="send-buttons">
      <span class="send-buttons-text">Eenter发送，Ctrl+Eenter换行</span>
      <!-- <button></button> -->
      <button class="my-button" type="success">发送</button>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.send-box{
  width: 100%;
  height: 100%;
  .send-bar{
    border-top: 1px solid #ececec;
    display: flex;
    padding: 5px;
    div{
      padding: 0 5px;
    }
  }
  .send-eidt{
    width: 100%;
    padding: 8px 20px;
    .text-box{
      width: 100%;
      height: 95px;
      font-size: 14px;
      line-height: 2;
      border:none;
      outline: none;
      .img{
        width: 30px;
      }
    }
  }
  .send-buttons{
    padding: 5px 10px;
    text-align: right;
    .send-buttons-text{
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>