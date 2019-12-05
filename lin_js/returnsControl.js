//返回按键监听设置
function setTimeBackUrl(fun_=function(){}){
    //	判断浏览器内核
    var navigator_=navigator.userAgent;	console.log(navigator_);
	var bool_ =	navigator_.indexOf('QQBrowser') > -1||
				navigator_.indexOf('baidu') > -1||
				navigator_.indexOf('UCBrowser') > -1;

    //特殊浏览器方法
    if(bool_){
    	
        var switch_=false;  
        var setTime_=setTimeout(function(){  switch_=true;  },1000);
        // 监听返回键按钮
        window.addEventListener("popstate", function(e) {
              if(switch_){	          	
                  switch_=false;
                  fun_();
              }
        });
        
    }else{
        // 监听返回键按钮
        window.addEventListener("popstate", function(e) {
            fun_();
        });
    }
};