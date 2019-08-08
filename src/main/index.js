import { app, BrowserWindow,ipcMain,Tray,Menu } from 'electron'
import store from '../renderer/store';
import wxbot from './bot';
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

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
let bot;
function createWindow () {
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
  store.commit('SET_VERSION','v0.0.1');
  setTray();
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
function setInterTray () {
  var count = 0;
  clearInterval(timer);
  timer = null;
  timer=setInterval(function() {
    count++;
    if (count%2 == 0) {
      appTray.setImage(path.join(__static, '/empty.ico'))
    } else {
      appTray.setImage(path.join(__static, '/user.png'))
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
