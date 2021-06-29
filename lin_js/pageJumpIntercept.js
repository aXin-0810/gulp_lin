/**
 * @description 判断是否为移动端
 */
export function mobile() {
  var ua = navigator.userAgent;
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;
  return isMobile;
};

/**
 * @description 浏览器设置返回页
 * @param {*} url_ 返回页地址
 * @param {*} parameter 携带的参数
 * @param {*} num_ 返回次数
 */
export function backTo(url_, parameter = '', num_ = 1) {
  // 判断是否为移动端
  var isMobile = mobile();

  // 移动端时
  if (isMobile) {
    // 获取地址栏地址
    var host = document.URL;
    // 获取本地缓存参数为地址栏地址
    var pagecount = localStorage.getItem(host);
    // 获取本地缓存判断刷新
    var sxbool = localStorage.getItem(host + '_bool'); //用于判断刷新
    var sxbool_2 = localStorage.getItem(host + '_bool2'); //用于判断是否插入历史数据
    // 设置将要跳转的页面（可传递参数）
    var backUrl = url_ + "?" + parameter;

    // 判断本地缓存数据是否存在
    if (pagecount) {
      // 判断是否为刷新
      if (!sxbool) {
        // 加1
        pagecount = Number(pagecount) + 1;
        // 设置本地缓存
        // 用于计数
        localStorage.setItem(host, pagecount);
        // 用于判断刷新
        localStorage.setItem(host + '_bool', true);
      }
    } else {
      // 设置本地缓存
      if (!sxbool) {
        // 设置本地缓存
        // 用于计数
        localStorage.setItem(host, 1);
        // 用于判断刷新
        localStorage.setItem(host + '_bool', true);
      }
    };

    // 判断本地计数小于等于参数
    if (pagecount <= num_) {
      if (document.referrer != backUrl) {

        // 插入空数据
        if (!sxbool_2) {
          localStorage.setItem(host + '_bool2', true);
          window.history.pushState(null, null, "");
        }

        // 调用返回按键监听设置函数returnsControl.js文件
        InterceptCallback(function () {
          // 删除本地缓存
          localStorage.removeItem(host + '_bool');
          localStorage.removeItem(host + '_bool2');
          // 跳转指定页面
          location.href = backUrl;
        });
      }
    } else {

      // 插入空数据
      if (!sxbool_2) {
        localStorage.setItem(host + '_bool2', true);
        window.history.pushState(null, null, "");
      }

      // 调用返回按键监听设置函数returnsControl.js文件
      InterceptCallback(function () {
        // 删除本地缓存
        localStorage.removeItem(host);
        localStorage.removeItem(host + '_bool2');
        // 返回上一页
        window.history.back();
      });
    };
  };
};

/**
 * @description 移动端拦截返回按键监听
 * @param {*} fun_ 
 */
export function InterceptCallback(fun_ = function () { }) {
  //	判断浏览器内核
  var navigator_ = navigator.userAgent; 
  var bool_ = 
    navigator_.indexOf('QQBrowser') > -1 ||
    navigator_.indexOf('baidu') > -1 ||
    navigator_.indexOf('UCBrowser') > -1;

  //特殊浏览器方法
  if (bool_) {

    var switch_ = false;
    setTimeout(function () { switch_ = true; }, 1000);
    // 监听返回键按钮
    window.addEventListener("popstate", function (e) {
      if (switch_) {
        switch_ = false;
        fun_();
      }
    });

  } else {
    // 监听返回键按钮
    window.addEventListener("popstate", function (e) {
      fun_();
    });
  }
};
