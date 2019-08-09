<template>
  <div class="wxLoginPage">
    <app-header></app-header>
    <div>
      <div id="qrcode" ref="qrcode"></div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import appHeader from '../components/app/app-header'
import {mapState} from 'vuex';
export default {
  components:{
    appHeader
  },
  data() {
    return {
      qrcode:null,
    }
  },
  computed: {
    ...mapState({
      loginUrl:({bot})=>bot.loginUrl
    })
  },
  methods:{
    goStart(){
      this.$router.push('/home')
    },
    getQrcode () {
      if(this.qrcode){
        this.qrcode.makeCode(this.loginUrl)
      }else{
        this.qrcode = new QRCode('qrcode',{
          width: 200, // 设置宽度，单位像素
          height: 200, // 设置高度，单位像素
          text: this.loginUrl // 设置二维码内容或跳转地址
        })
      }
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.getQrcode()
    })
  },
  watch:{
    loginUrl(newVal,oldVal){
      if(newVal!=oldVal){
        this.getQrcode()
      }
    }
  }
}
</script>