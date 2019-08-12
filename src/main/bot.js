const {
  FileBox,
  Friendship,
  Wechaty,
  Message,
}             = require('wechaty');
import store from '../renderer/store';
const bot = {
  bot:null,
  init(){
    let self = this;
    let bot = Wechaty.instance({name:'my-wechaty'})
    bot.on('scan',(qrcode,status)=>{
      let url = decodeURIComponent(qrcode);
      if (!/201|200/.test(String(status))) {
        store.commit('SET_LOGIN_TYPE',false);
        store.commit('SET_LOGIN_URL',url)
      }
      console.log(`${status}: ${decodeURIComponent(url)} - Scan QR Code of the url to login:`)
    })
    return bot

  }
}
export default bot;