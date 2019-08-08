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
    let bot = Wechaty.instance()
    console.log(111)
    bot.on('scan',(qrcode,status)=>{
      console.log(222)
      self.qrcode = decodeURIComponent(qrcode);
      console.log(`${status}: ${decodeURIComponent(qrcode)} - Scan QR Code of the url to login:`)
    })
    .on('logout',(user)=>{
      console.log(`退出登录！`);
    })
    .on('login',(user)=>{
      console.log(user.id);
      
    }).start()
    return bot

  }
}
export default bot;