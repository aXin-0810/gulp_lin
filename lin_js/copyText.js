/**
 * 此函数基于jQuery.js与clipboard2.0.js
 */

function btn_copyText() {
	var this_ = this;
	//点击复制函数
	this_.btn_copy = function(option) {
		var obj = {};
		var option = option||{};
		obj["classArr"] = option["classArr"]||[];
		obj["copyVal"] = option["copyVal"]||"";
		obj["successful"] = option["successful"]||function(){};
		
		var navigator_ = navigator.userAgent;
		var classStr = obj.classArr.join();
		if(navigator_.indexOf('MQQBrowser/7') > -1){
			//创建多行输入框
			CreateTextTarea();
			$(classStr).click(function() {
				var  copyVal = 	copeValFn(obj.copyVal);	
				//给多行输入框复制
				$('#copytext_val').val(copyVal);
				var Url2 = document.getElementById("copytext_val"); //获取对象
				Url2.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				obj.successful(copyVal);
			});
		}else{
			//使用插件
			//调用插件使用插件方法
			$.getScript("http://m.elletter.com/lin/clipboard2.0.js", function() {
				var copeVals = "";
				//分割数组内class
				var clipboard = new ClipboardJS(classStr, {
					text: function() {
						 copeVals= 	copeValFn(obj.copyVal);
						return copeVals;
					}
				});
				clipboard.on('success', function(e) {
					obj.successful(copeVals);
					
				});
				clipboard.on('error', function(e) {
					console.log(e);
				});

				// 促发点击事件(方能兼容iPhone)
				$(classStr).click(function() {
					copeVals = 	copeValFn(obj.copyVal);
					//判断是否UC浏览器，设置UC点击复制回调
					if( navigator_.indexOf('UCBrowser') > -1) {
						obj.successful(copeVals);
					} 
				});
			});
			
		}

		//创建多行输入框
		function CreateTextTarea(){
			var textarea = document.createElement("textarea");
			textarea.id = 'copytext_val';
			document.body.appendChild(textarea);

			//设置样式在看不见的地方
			$('#copytext_val').css({
				position: 'fixed',
				marginTop: '-1000px'
			});
		}
		//为了适应ajax的延迟，复制内容可以接收一个函数参数（返回复制内容）
		function copeValFn(val){
			if(typeof val=='function'){
				val= val();
				val = (Object.prototype.toString.call(val)=="[object Array]" && val.length)?$(val.join(",")).html().trim():val;		
			}
			return val = val?val:"";
		}
	}
	
};

//var copyText_=new btn_copyText();
//copyText_.btn_copy({
//	classArr:['.wxno','.abc'],
//	copyVal:'456',
//	successful:function(){
//		window.open('http://www.baidu.com/');
//	}
//});

//长按复制
function press_copyText() {
	var this_ = this;

	//长按复制函数
	this_.down_copy = function(obj = {
		successful: function() {}
	}) {
		longPressFun(obj);
	};

	//相同复制数据不做重复操作
	var okVal = '';

	function longPressFun(obj = {
		successful: function() {}
	}) {
		//复制监听
		document.addEventListener('copy', function(event) {
			//获取高亮选中内容
			var copyVal = window.getSelection(0).toString();

			if(okVal != copyVal) {
				okVal = copyVal;
				//长按复制成功执行函数
				obj.successful(okVal);
			};
		});

		//复制监听不兼容时备用方案
		//判断浏览器内核
		var bool_ = navigator.userAgent.indexOf('QQBrowser') > -1 ||
			navigator.userAgent.indexOf('UCBrowser') > -1||
			navigator.userAgent.indexOf("baidubrowser")>-1;

		if(bool_) {
			//复制内容
			var copyVal = '';
			//高亮选中内容
			var transit = '';
			//参照选中
			var transit2 = '';
			//判断是否选中
			var canshu = 0;

			//获取数据参照
			setInterval(function() {
				//获取高亮选中内容
				transit2 = window.getSelection(0).toString();
			}, 1200);
			setInterval(function() {
				//获取高亮选中内容
				transit = window.getSelection(0).toString();
				//判断是否有选中
				if(transit != '') {
					copyVal = transit;
				};
			}, 100);
			//判断高亮选中超过一秒没变化
			setInterval(function() {
				//判断复制内容是否为空
				if(copyVal == transit2 && copyVal != '') {
					canshu++
				};
				//选中时间超过1秒判断为是复制
				if(canshu >= 10) {
					//判断复制内容和上一次复制是否相同
					if(okVal != copyVal) {
						okVal = copyVal;
						//长按复制成功执行函数
						obj.successful(okVal);
					};
					//清空复制内容
					copyVal = '';
					//参数归零
					canshu = 0;
				};
			}, 120);
		};
	};
};

//var longPressFun_=new press_copyText();
//longPressFun_.down_copy({
//	successful:function(){
//		console.log('ok');
//	}
//});