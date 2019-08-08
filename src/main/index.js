import { app, BrowserWindow,ipcMain } from 'electron'
import store from '../renderer/store'
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
  mainWindow.on('closed', () => {
    mainWindow = null
  })
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


//窗口最小化
ipcMain.on('minimize',(event,arg)=>{
  mainWindow.minimize();
})
ipcMain.on('maximize',(event,arg)=>{
  mainWindow.maximize();
  store.commit('SET_IS_WIN_MAX',true)
})
ipcMain.on('unmaximize',(event,arg)=>{
  mainWindow.unmaximize();
  store.commit('SET_IS_WIN_MAX',false)
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
