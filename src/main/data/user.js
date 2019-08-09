const nedb = require('nedb');
const path = require("path");
let user = new nedb({
  filename:path.join(__dirname, '/data/user.db') ,
  autoload: true,
  timestampData:true
});
export default user;