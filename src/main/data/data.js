const nedb = require('nedb');
const path = require("path");
// 实例化连接对象（不带参数默认为内存数据库）
const data = {}
data.setting = new nedb({
  filename:path.join(__dirname, '/data/setting.db') ,
  autoload: true
});

data.user = new nedb({
  filename:path.join(__dirname, '/data/user.db') ,
  autoload: true
});

data.bot_friend = new nedb({
  filename:path.join(__dirname, '/data/bot_friend.db') ,
  autoload: true,
  timestampData:true
});

data.bot_message = new nedb({
  filename:path.join(__dirname, '/data/bot_message.db') ,
  autoload: true,
  timestampData:true
});

data.bot_room = new nedb({
  filename:path.join(__dirname, '/data/bot_room.db') ,
  autoload: true,
  timestampData:true
});
export default data;