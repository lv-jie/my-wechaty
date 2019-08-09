const nedb = require('nedb');
const path = require("path");
const bot_friend = new nedb({
  filename:path.join(__dirname, '/data/bot_friend.db') ,
  autoload: true,
  timestampData:true
});
export default bot_friend;