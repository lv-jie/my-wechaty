const nedb = require('nedb');
const path = require("path");
const bot_message = new nedb({
  filename:path.join(__dirname, '/data/bot_message.db') ,
  autoload: true,
  timestampData:true
});
export default bot_message;