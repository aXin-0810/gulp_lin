/*设置返回页*/
/**
 * 条件需要引入mobile.js先
 */

function backTo_(url_,parameter='',num_=1){
  // 判断是否为移动端
  var isMobile = mobile();

  // 移动端时
  if(isMobile) {
    // 获取地址栏地址
    var host = document.URL;
    // 获取本地缓存参数为地址栏地址
    var pagecount = localStorage.getItem(host);
    // 获取本地缓存判断刷新
    var sxbool = localStorage.getItem(host+'_bool'); //用于判断刷新
    var sxbool_2 = localStorage.getItem(host+'_bool2'); //用于判断是否插入历史数据
    // 设置将要跳转的页面（可传递参数）
    var backUrl = url_+"?"+parameter;

    // 判断本地缓存数据是否存在
    if(pagecount) {
      // 判断是否为刷新
      if(!sxbool){
        // 加1
        pagecount = Number(pagecount) + 1;
        // 设置本地缓存
        // 用于计数
        localStorage.setItem(host, pagecount);
        // 用于判断刷新
        localStorage.setItem(host+'_bool', true);
      }
    } else {
      // 设置本地缓存
      if(!sxbool){
        // 设置本地缓存
        // 用于计数
        localStorage.setItem(host, 1);
        // 用于判断刷新
        localStorage.setItem(host+'_bool', true);
      }
    };
    
    // 判断本地计数小于等于参数
	if(pagecount <= num_) {
      if(document.referrer != backUrl) {

        // 插入空数据
        if(!sxbool_2){
          localStorage.setItem(host+'_bool2', true);
          window.history.pushState(null , null , "");
        }

        // 调用返回按键监听设置函数returnsControl.js文件
        setTimeBackUrl(function(){
          // 删除本地缓存
          localStorage.removeItem(host+'_bool');
          localStorage.removeItem(host+'_bool2');
          // 跳转指定页面
          location.href = backUrl;
        });
      }
    } else {

	    // 插入空数据
      if(!sxbool_2){
        localStorage.setItem(host+'_bool2', true);
        window.history.pushState(null , null , "");
      }

      // 调用返回按键监听设置函数returnsControl.js文件
	  setTimeBackUrl(function(){
        // 删除本地缓存
        localStorage.removeItem(host);
        localStorage.removeItem(host+'_bool2');
        // 返回上一页
        window.history.back();
      });
    };
  };
};
