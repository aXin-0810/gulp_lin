function returnKey(obj={
  intercept:function(){}
}){
  // 获取地址栏地址
  var host = document.URL;
  // 获取本地缓存判断刷新
  var sxbool = localStorage.getItem(host+'bool');

  if(!sxbool){
    localStorage.setItem(host+'bool',true);
    window.history.pushState(null , null , "");	
  };

  // 调用返回按键监听设置函数returnsControl.js文件
  setTimeBackUrl(function(){
    // 删除本地缓存
    localStorage.removeItem(host+'bool');
    obj.intercept();
  });
  
};

/**
 * 使用描述：此函不能与返回页公用（冲突）
 * returnKey({    调用函数
 *    intercept:function(){
 *                拦截后要操作的js
 *    }
 * });
 */