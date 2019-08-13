let addZero = val => {
  /*数字未满10，加0*/
  if (val < 10) {
      val = `0${val}`;
  }
  return val;
};
const filterHandler = {
  dealTime(val, type = "l", WHATEVER = "en",link='-') {
      /*WHATEVER日期连接中文显示还是英文显示，默认根据用户选择的语言连接，接收指定值*/
      // try {
      //     val=val.replace(/-/g,'/');
      // } catch (error) {
      //     console.log(error.message)
      // }

      let timeInit = new Date(val),
          y = addZero(timeInit.getFullYear()),
          m = addZero(timeInit.getMonth() + 1),
          d = addZero(timeInit.getDate()),
          h = addZero(timeInit.getHours()),
          min = addZero(timeInit.getMinutes()),
          sec = addZero(timeInit.getSeconds()),
          res = "";
      if (WHATEVER === "en") {
          switch (type) {
              case "hm":
                  {
                      res = `${h}:${min}`;
                      break;
                  }
              case "xs":
                  {
                      res = `${h}:${min}:${sec}`;
                      break;
                  }
              case "s":
                  {
                      res = `${m}${link}${d} ${h}:${min}:${sec}`;
                      break;
                  }
              case "ymd":
                  {
                      res = `${y}${link}${m}${link}${d}`;
                      break;
                  }
              case "md":
                  {
                      res = `${m}${link}${d}`;
                      break;
                  }
              default:
                  {
                      res = `${y}${link}${m}${link}${d} ${h}:${min}:${sec}`;
                  }
          }
      } else {
          switch (type) {
              case "hm":
                  {
                      res = `${h}:${min}`;
                      break;
                  }
              case "xs":
                  {
                      res = `${h}:${min}:${sec}:`;
                      break;
                  }
              case "s":
                  {
                      res = `${m}月${d}日 ${h}:${min}:${sec}`;
                      break;
                  }
              case "ymd":
                  {
                      res = `${y}年${m}月${d}日`;
                      break;
                  }
              case "md":
                  {
                      res = `${m}月${d}日`;
                      break;
                  }
              default:
                  {
                      res = `${y}年${m}月${d}日 ${h}:${min}:${sec}`;
                  }
          }
      }
      return res;
  },
  msgTime(val){
    let dealTime =filterHandler.dealTime
    if(val){
      let now = new Date();
      let nowDay = dealTime(now,'ymd');
      let timeDay = dealTime(val,'ymd');
      if(nowDay==timeDay){
        return dealTime(val,'hm','en','/');
      }else{
        let temTime = new Date(val+24*60*60*1000);
        if(nowDay==dealTime(temTime,'ymd')){
          return '昨天'
        }else{
          return timeDay
        }
      }
    }else{
      return ''
    }
    
  }
};
export default Vue => {
  Vue.prototype.$addZero=addZero;
  Object.keys(filterHandler).forEach(key => {
      Vue.filter(key, filterHandler[key]);
  });
}