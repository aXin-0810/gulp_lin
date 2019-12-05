function mobile(){
  var ua = navigator.userAgent;
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      isAndroid = ua.match(/(Android)\s+([\d.]+)/),
      isMobile = isIphone || isAndroid;
  return isMobile;
}
/**
 * 使用描述：
 * mobile();    //返回数据为true则是手机为false则是pc 
 */