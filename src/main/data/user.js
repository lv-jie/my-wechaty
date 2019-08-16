const nedb = require('nedb');
const path = require("path");
import { app, remote } from 'electron'
let filePath = (remote&&remote.app)?remote.app.getPath('userData'):app.getPath('userData')
let user = new nedb({
  filename:path.join(filePath, '/data/user.db') ,
  autoload: true,
  timestampData:true
});
export default user;