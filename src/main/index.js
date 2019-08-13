import { app, BrowserWindow,ipcMain,Tray,Menu } from 'electron'
import store from '../renderer/store';
import wxbot from './bot';
import db_message from './data/bot_message';
import db_friend from './data/bot_friend';
const { FileBox } = require('wechaty');
const path = require("path");
const fs=require('fs');
const request = require("request");
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at:', p, 'reason:', reason);
//   // application specific logging, throwing an error, or other logic here
// });
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
let bot;
let intFriend =null;
async function createWindow () {
  if (!fs.existsSync(path.join(__static,'/avatar'))) {
    fs.mkdirSync(path.join(__static,'/avatar'));
    console.log("文件夹创建成功");
  } else {
      console.log("文件夹已存在");
  }
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 550,
    width: 400,
    minWidth: 750,//窗口的最小宽度, 默认值为 0.
    minHeight: 550,// 窗口的最小高度. 默认值为 0.
    useContentSize: false,//窗口的大小是否包括边框
    center:true,//窗口居中
    transparent:true,//窗口透明
    hasShadow:false,//窗口是否有阴影. 仅在 macOS 上支持
    // backgroundColor:'#515151',//设置窗口颜色
    resizable:true,//窗口大小是否可以改变
    frame:false,//是否显示边框和
  })

  mainWindow.loadURL(winURL)
  //窗口失去焦点时触发
  mainWindow.on('blur',event=>{
    // console.log(store.state.option.isWinMax)
    // mainWindow.show()
    }
  )
  // 窗口最大化时触发
  mainWindow.on('maximize',event=>{
    store.commit('SET_IS_WIN_MAX',true)
    }
  )
  // 窗口退出最大化时触发
  mainWindow.on('unmaximize',event=>{
    
    store.commit('SET_IS_WIN_MAX',false)
    }
  )
  mainWindow.on('close',event=>{
    event.preventDefault()
    mainWindow.hide()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  bot = wxbot.init()
  bot.on('logout',(user)=>{
    mainWindow.webContents.send('wx_logout');
    store.commit('SET_LOGIN_TYPE',false);
    clearInterval(intFriend);
    intFriend=null;
    console.log(`退出登录！`);
  })
  .on('login',async (user)=>{
    const file = await user.avatar()
    let gender=user.gender()
    // let province=user.province()?user.province():await user.province()
    // let city=user.city()?user.city():await user.city()
    let name = file.name;
    // name = name.replace(/(\[|\]|\\|\/|\s)/g,'');
    let avatarPath = path.join(__static,`/avatar/${name}`);
    let userInfo = {
      wx_id:user.id,
      name:user.name(),
      avatar:`/avatar/${name}`,
      gender,
      signature:user.payload.signature,
      province:user.payload.province,
      city:user.payload.city,
    }
    store.dispatch('setUserInfo', userInfo)
    fs.exists(avatarPath,async (flag)=>{
      if(flag){
        console.log("文件存在");
      }else{
        console.log("文件不存在");
        await file.toFile(avatarPath);
      }
    })
    mainWindow.webContents.send('wx_login');
    store.commit('SET_LOGIN_TYPE',true);
    store.dispatch('getAllFriend',bot);
    intFriend = setInterval(()=>{
      console.log('------')
      store.dispatch('getAllFriend',bot);
    },60000*5)
  })
  .on('message',onMessage)
  await bot.start()
  let isWxlogin = !bot.logonoff();
  store.commit('SET_LOGIN_TYPE',isWxlogin);
  if(isWxlogin){

  }
  store.commit('SET_VERSION','v0.0.1');
  setTray();
}

async function onMessage(message) {
  try {
    console.log('----111------')
    const room      = message.room()//房间
    const sender    = message.from()//来自
    const receiver  = message.to()  
    const content   = message.text()//消息内容
    const msg_type = message.type()//消息类型
    const isSelf = message.self();
    if(room){
      // 群消息
      db_message.insert({
        user_id:receiver.id,
        type:1,
        msg_type,
        content,
        isRead:0,
        room_id:room.id,
        from_id:sender.id,
      },(err,res)=>{
        store.dispatch('getAllFriend',bot);
      })
    }else{
      if(isSelf){
        db_message.insert({
          user_id:sender.id,
          type:3,
          msg_type,
          content,
          isRead:1,
          to_id:receiver.id,
        },(err,res)=>{
          store.dispatch('getAllFriend',bot);
        })
      }else{
        db_message.insert({
          user_id:receiver.id,
          type:2,
          msg_type,
          content,
          isRead:0,
          from_id:sender.id,
        },(err,res)=>{
          store.dispatch('getAllFriend',bot);
        })
        let myCont = await bot.Contact.find({id:sender.id});
        let fileBox1 = await FileBox.fromFile(path.join(__static,'/user.jpg'))
        console.log(fileBox1)
        await myCont.say(fileBox1);
        db_friend.findOne({wx_id:sender.id},(err,res)=>{
          if(!err){
            setInterTray(res.avatar)
          }
        })
      }
      
    }
  } catch (error) {
    console.log(error)
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

let appTray = null;   //托盘对象

let appTrayClick; //托盘点击事件

// 隐藏主窗口，并创建托盘，绑定关闭事件
function setTray () {
    // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区
    //  ，通常被添加到一个 context menu 上.
    // 系统托盘右键菜单
    let trayMenuTemplate = [{     // 系统托盘图标目录
        label: '退出',
        click: function () {
            app.quit();
        }
    }];
    // 当前目录下的app.ico图标
    let iconPath = path.join(__static, '/icon.png');
    appTray = new Tray(iconPath);
    // 图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    // 隐藏主窗口
    // mainWindow.hide();
    // 设置托盘悬浮提示
    appTray.setToolTip('my-wechaty');
    // 设置托盘菜单
    appTray.setContextMenu(contextMenu);
    // 单击托盘小图标显示应用
    appTrayClick = function () {
      mainWindow.show();
    }
    appTray.on('click', appTrayClick);
};

let timer = null;
function setInterTray (url) {
  var count = 0;
  clearInterval(timer);
  timer = null;
  timer=setInterval(function() {
    count++;
    if (count%2 == 0) {
      appTray.setImage(path.join(__static, '/empty.ico'))
    } else {
      appTray.setImage(path.join(__static, url))
    }
  },500)
  appTrayClick = function () {
    clearInterval(timer);
    timer = null;
    appTray.setImage(path.join(__static, '/icon.png'))
    mainWindow.show();
    appTrayClick = function () { 
      mainWindow.show();
    }
  }
  appTray.on('click', appTrayClick);
}
//保存用户头像
async function  saveUserImg(url) {
  let readStream = await request(url);
  let stream = fs.createWriteStream(path.join(__static, '/user.png'));
  readStream.pipe(stream)
}
//窗口最小化
ipcMain.on('minimize',(event,arg)=>{
  mainWindow.minimize();
})
//最大化
ipcMain.on('maximize',(event,arg)=>{
  mainWindow.maximize();
  store.commit('SET_IS_WIN_MAX',true)
})
//取消最大化
ipcMain.on('unmaximize',(event,arg)=>{
  mainWindow.unmaximize();
  store.commit('SET_IS_WIN_MAX',false)
})
//窗口关闭
ipcMain.on('win-close',(event,arg)=>{
  mainWindow.hide()
})
//收到闪烁消息
ipcMain.on('setInterTray',(event,arg)=>{
  saveUserImg(arg)
  setInterTray()
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
