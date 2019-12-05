//功能:监听功能:复制,去微信/qq, 
/*
 	注意:1.当前页面不刷新下,只能监听一次
 * */
	
/**
 * 用法:
 * 实例化一个对象,调用方法init();
 *接收三个参数 type:1 代表是监听点击复制,2 代表是监听长按复制,3.代表监听去微信获取qq;(必填)
 *			  copyVal:监听要复制的内容( 可选,一般在调用复制功能的回调函数中获取)	
 * 			  cb:成功监听的回调函数 (可选)
 * 
 * var listenFns =new listenHandle();
 * listenFns.init({
		type:1,
		copyVal:""
		cb:function(){
			console.log("监听成功")
		}
	})
 * 
 * **/

/**请求接口
 * http://120.26.217.212:8086/api/h/1.0/clipboardLogs
  * api 参数 {
		kw_sign_id	:签名id
		kw_url://
		kw_ref://
		c:复制内容
		v: new Date().getTime() 当前时间 
		keyword:关键词
		isBtnCopy: 默认0 ; 是否是点击复制
		isBtnToWechat:默认0 ;是否点击去微信
	} 
  * */

 ;(function(window){
				
	//辅助函数
	var myUtil = {
		getURLParam:function(strParamName, url){//获取地址指定key =>val 的值
			var strReturn = "";
			var strHref = url.toLowerCase();
			if(strHref.indexOf("?") > -1) {
				var strQueryString = strHref.substr(strHref.indexOf("?") + 1).toLowerCase();
				var aQueryString = strQueryString.split("&");
				for(var iParam = 0; iParam < aQueryString.length; iParam++) {
					if(aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1) {
						var aParam = aQueryString[iParam].split("=");
						strReturn = aParam[1];
						break;
					}
				}
			}
			return strReturn;
		},
		//找关键词
		findWord:function(url){
			var arr = ['word','wd','query','keyword','q','p','w','search','9labQuery'];
			var isTrue = false;
			for (var i = 0;i<arr.length;i++) {
				isTrue = url.indexOf(arr[i]+'=')>=0;
				if(isTrue){
					return arr[i];
				}
			}
		},
		GetQueryString:function(url,name){
			 var reg = new RegExp("(^|)"+ name +"=([^&]*)(&|$)");
		    var r = url.match(reg);
		    if(r!=null)return  decodeURIComponent(r[2]); return null;
		},
		//序列化对象数据:{name:admin,age:1} 如: name=admin&age=1;
		serialize:function(obj){
		
			if(Object.prototype.toString.call(obj)!=="[object Object]") return "";
			var str ="";
			for(var keys in obj){
				str+=keys+"="+obj[keys]+"&";
			}
			str = str.substring(0,str.length-1);
			return str;
			
		},
		//继承合拼对象参数
		extend:function(orgObj,extObj){
			if(Object.prototype.toString.call(orgObj)!="[object Object]") var orgObj = {};
			if(Object.prototype.toString.call(extObj)!="[object Object]") var extObj = {};
			for (var keys in extObj) {
				orgObj[keys] = extObj[keys];
			}
			return orgObj;
			
		}
	}

	function listenHandle(){
		var isBtnCopy=0;//单击复制
		var isBtnToWechat=0;//去微信
		var isBtnPressCopy = 0;
		var apiHost = "http://120.26.217.212:8086/api/h/1.0/clipboardLogs";
		var copyContent = "";//复制的内容;
		var this_ = this;
		
		this_.init = function (obj){
			//合拼自定义参数
			var options =myUtil.extend({
				type:"",
				copyVal:copyContent,
				cb:function(){}
			},obj);
			//根据不同类型发送请求
			if(options.type===1 && isBtnCopy===0){//点击复制请求
				copyContent = options.copyVal;
				isBtnCopy=1;
				dataApi();
				setTimeout(options.cb(),1);
				
			}else if(options.type===2 && isBtnPressCopy===0){//长按复制请求
				isBtnPressCopy = 1;
				copyContent = options.copyVal;
				if(copyContent){
					dataApi();
				}
				setTimeout(options.cb(),1);
			}
			else if(options.type===3 && isBtnToWechat===0){//跳转微信/qq 请求
				isBtnToWechat = 1;
				dataApi();
				setTimeout(options.cb(),1);
			}
		}
		
		//处理数据并发送请求,利用图片资源src 请求
		function dataApi(){
	
			var data = {
				kw_sign_id:getSignId()||"",
				kw_url:escape(getKwUrl())||"",
				kw_ref:escape(getKwRef())||"",
				c:copyContent||"",
				v: (new Date()).getTime(),
				keyword:getKeyWord()||null,
				isBtnCopy:isBtnCopy||0,
				isBtnToWechat:isBtnToWechat||0
			};
			window.kw_gurl = apiHost+"?"+myUtil.serialize(data);//此处要用全局window 变量,要不会报错,
			setTimeout('kw_img = new Image;kw_img.src=kw_gurl;', 1);
			
		}
		

		//获取api 参数 :kw_sign_id
		function getSignId(){
			var kw_sign_id = "";
			try {
				js_url = document.getElementById("kw_tongji");
				if(js_url&&js_url.src){
					kw_sign_id = getURLParam('sign', js_url);
				}
				
			} catch(e) {}
			
			return  kw_sign_id;
		}
		//获取api 参数 :kw_url
		function getKwUrl(){
			var kw_url = "";
			try {
				kw_url = window.parent.location;
			} catch(e) {}
			
			return kw_url;
			
		}
		//获取api 参数 :kw_ref
		function getKwRef(){
			var kw_ref = "";
			try {
				kw_ref = window.parent.document.referrer;
			} catch(e) {}
			
			return kw_ref;
			
		}
		//获取api 参数: keyword (关键词)
		function getKeyWord(){
			var keyword = "";
			var kw_ref = getKwRef();
			try {
				keyword = myUtil.GetQueryString(kw_ref,myUtil.findWord(kw_ref));
				localStorage.setItem('9labQuery',keyword);
			} catch(e) {}
			return keyword;
		}
		function getAdress(){
			var adress = localStorage.getItem("ADDRESS");
			return adress;
		}

		
		
		
	}
	window.listenHandle = listenHandle;
})(window);
		