const nedb = require('nedb');
const path = require("path");
import { app, remote } from 'electron'
let filePath = (remote&&remote.app)?remote.app.getPath('userData'):app.getPath('userData')
const bot_message = new nedb({
  filename:path.join(filePath, '/data/bot_message.db') ,
  autoload: true,
  timestampData:true
});
export default bot_message;