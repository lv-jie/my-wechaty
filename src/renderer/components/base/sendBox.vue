<template>
  <div class="send-box">
    <div class="send-bar">
      <div class="send-button" @click="emojiModel=!emojiModel">
        <i class="wxicon wx-biaoqing"></i>
        <div class="emoji-model" v-if="emojiModel">
          <div class="emoji-item" v-for="(item,index) in emojiList" :key="`emoji${index}`" :title="item.title" @click="addEmoji(item)">
            <span :title="item.title" :class="item.class"></span>
          </div>
        </div>
      </div>
      <div class="send-button">
        <i class="wxicon wx-picture"></i>
      </div>
      <div class="send-button">
        AI
      </div>
    </div>
    <div class="send-eidt">
      <!-- <textarea name="" id="" cols="30" rows="3" class="text-box" ref="content" @keydown.ctrl.enter="lineFeed" @keydown.enter.exact="sendMsg"></textarea> -->
      <div @click="setLastRange" @keyup="setLastRange" @keydown.ctrl.enter.prevent="lineFeed" @keydown.enter.exact.prevent="sendMsg" class="text-box" ref="content" contenteditable="true" placeholder="" tabindex="0" dir="ltr" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">
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
// import {mapState} from 'vuex';
import list from "../../../../static/emoji/emojiList.js"
export default {
  data(){
    return{
      emojiModel:false,
      emojiList:list,
      lastEditRange:''
    }
  },
  // computed:{
  //   ...mapState({
  //     emojiList:({option})=>option.emojiList
  //   })
  // },
  methods: {
    setLastRange(){
      let selection = getSelection();
      this.lastEditRange = selection.getRangeAt(0);
    },
    addEmoji(item){
      let dom = this.$refs.content
      let selection = window.getSelection
        ? window.getSelection()
        : document.selection;
      dom.focus();
      if (this.lastEditRange) {
          // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
          selection.removeAllRanges();
          selection.addRange(this.lastEditRange);
      }
      var range = selection.createRange
          ? selection.createRange()
          : selection.getRangeAt(0);
      if (!window.getSelection) {
          let selection = window.getSelection
              ? window.getSelection()
              : document.selection;
          var range = selection.createRange
              ? selection.createRange()
              : selection.getRangeAt(0);
          range.pasteHTML(`<img class="${item.class}" src="../../../../static/empty.ico">`);
          range.collapse(false);
          range.select();
      } else {
          var hasR = range.createContextualFragment(`<img class="${item.class}" src="../../../../static/empty.ico">`);
          var hasR_lastChild = hasR.lastChild;
          while (
              hasR_lastChild &&
              hasR_lastChild.nodeName.toLowerCase() == 'br' &&
              hasR_lastChild.previousSibling &&
              hasR_lastChild.previousSibling.nodeName.toLowerCase() == 'br'
          ) {
              var e = hasR_lastChild;
              hasR_lastChild = hasR_lastChild.previousSibling;
              hasR.removeChild(e);
          }
          range.insertNode(hasR);
          if (hasR_lastChild) {
              range.setEndAfter(hasR_lastChild);
              range.setStartAfter(hasR_lastChild);
          }
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
      }
      // 无论如何都要记录最后光标对象
      this.lastEditRange = selection.getRangeAt(0);
    },
    sendMsg(){
      let dom = this.$refs.content
      let text = dom.innerHTML;
      let id = this.$route.params.id;
      // text = text.replace('<br>','\n')
      if(text){
        for (let index = 0; index < this.emojiList.length; index++) {
          let item = this.emojiList[index];
          let domText = `<img class="${item.class}" src="../../../../static/empty.ico">`
          if(text.indexOf(domText)!=-1){
            text = text.replace(domText,item.content)
            --index
          }
        }
        // console.log(text)
        this.$electron.ipcRenderer.send('wx-message',{id:id,text:text})
        dom.innerHTML = ''
      }else{
        return
      }
    },
    lineFeed(){
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
    .send-button{
      padding: 0 5px;
      cursor: pointer;
      position: relative;
      .emoji-model{
        width: 480px;
        height: 275px;
        position: absolute;
        padding: 10px;
        box-shadow: 0 0 15px #ccc;
        bottom: 28px;
        left: -50%;
        background: #fff;
        .emoji-item{
          width: 30px;
          height: 30px;
          float: left;
          text-align: center;
          span{
            display: inline-block;
            width: 100%;
            height: 100%;
            // background-size:100% 100%; 
          }
        }
        .emoji-item:hover{
          background: #e7e7e7;
        }
      }
    }
    .send-button:hover{
      color: #000;
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