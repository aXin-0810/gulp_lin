//获取地址栏参数
function GetRequest(name) {
   var url = location.search;
   var urls = url.substr(url.indexOf("?") + 1);
   var arr = urls.split("&");//分隔参数，返回数组
   var obj = {};
   for (var i = 0; i < arr.length; i++) {
       var objarr = arr[i].split("=");
       obj[objarr[0]] = objarr[1];
   }
  if(name) return obj[name];
   return obj;
};