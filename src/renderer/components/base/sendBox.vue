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
      <!-- <textarea name="" id="" cols="30" rows="3" class="text-box" ref="content" @keydown.ctrl.enter="lineFeed" @keydown.enter.exact="sendMsg"></textarea> -->
      <div @keydown.ctrl.enter.prevent="lineFeed" @keydown.enter.exact.prevent="sendMsg" class="text-box" ref="content" contenteditable="true" placeholder="" tabindex="0" dir="ltr" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
      </div>
    </div>
    <div class="send-buttons">
      <span class="send-buttons-text">Eenter发送，Ctrl+Eenter换行</span>
      <!-- <button></button> -->
      <button class="my-button" type="success" @click="sendMsg">发送</button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
    }
  },
  methods: {
    sendMsg(){
      let dom = this.$refs.content
      let text = dom.innerHTML;
      let id = this.$route.params.id;
      // text = text.replace('<br>','\n')
      console.log(text)
      if(text){
        console.log(this.$refs.content.innerHTML,this.$route.params.id)
        this.$electron.ipcRenderer.send('wx-message',{id:id,text:text})
        dom.innerHTML = ''
      }else{
        return
      }
    },
    lineFeed(){
      console.log('huanhang')
      let dom = this.$refs.content
      let text = dom.innerHTML;
      dom.innerHTML = text + '<br></br>'
      this.placeCaretAtEnd(dom)
    },
    placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
            else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
    },
  },
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
      overflow-y: auto;
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