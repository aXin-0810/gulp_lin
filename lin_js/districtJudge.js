function judge_(){
    var this_=this;
    this_.object_=[];
    this_.districtJudge=function(obj={
        // 区域数组
        area:[],
        // 区域内执行函数
        within_fun:function(){},
        // 区域外执行函数
        outside_fun:function(){}
    }){
        this_.object_.push({
            area:obj.area,
            within_fun:obj.within_fun,
            outside_fun:obj.outside_fun
        });
    };

	$.ajax({
        url:'https://restapi.amap.com/v3/ip?key=ca79565e0b2705aeb353b5620fe6541c',
        success:function(res){
        	//判断地区获取是否为空
            if(res.province &&  res.city){
				
            	//获取地区信息
				var addr=res.province+res.city;
				
				localStorage.removeItem("ADDRESS");
				localStorage.setItem("ADDRESS",addr)
            	console.log(addr);
            	//循环所有调用函数
            	for(var i=0;i<this_.object_.length;i++){
            		//判断地区筛选是否为空
		            if(this_.object_[i].area!==undefined){
		            	//获取地区筛选数组
		                var areaArr=this_.object_[i].area;
		                //初始设置布尔
		                var bool_=false;
		                //循环地区筛选数组
		                for(var n=0;n<areaArr.length;n++){
		                	//判断地区筛选数组中是否包含当前地区
		                	if(addr.indexOf(areaArr[n])>=0){
		                		//有返回true
		                		bool_=true;
		                		break;
		                	};
		                };
		                
		                //当前地区数据
		                this_.object_[i].e=addr;
		                
		                if(bool_){
		                	if(this_.object_[i].within_fun){
			                    this_.object_[i].within_fun();
			                }
		                }else{
		                	if(this_.object_[i].outside_fun){
			                    this_.object_[i].outside_fun();
			                }
		                }
		            };
		        };
            };
        },
        error:function(res){
			localStorage.removeItem("ADDRESS");
			localStorage.setItem("ADDRESS",null)
        }
    });


};
//var judge=new judge_();

/**
 * 使用描述：
 * judge.districtJudge({
 *      area:[],    // 区域数组
 *      within_fun:function(){},    // 区域内执行函数
 *      outside_fun:function(){}    // 区域外执行函数
 * });
 */