// 时间判断
function periodTime(){
    // 获取时间对象
    var presentTime=new Date();
    // 获取日期
    var date =  presentTime.getDate(); 
    // 获取星期几
    var week =  presentTime.getDay();
    // 当前小时
    var hours = presentTime.getHours();

    this.determine=function(obj={
        // 日期数组
        date:[],
        // 星期数组
        week:[],
        // 时间数组
        hours:[],
        // 条件满足回调函数
        within_fun:function(){},
        // 条件不满足回调函数
        outside_fun:function(){}
    }){
        if(obj.date == undefined || obj.date.indexOf(date)>=0 || obj.date.length==0){
            if(obj.week == undefined || obj.week.indexOf(week)>=0 || obj.week.length==0){
                if(obj.hours == undefined || obj.hours.indexOf(hours)>=0 || obj.hours.length==0){
                    if(obj.within_fun){
                        obj.within_fun();
                    }
                }else{
                    if(obj.outside_fun){
                        obj.outside_fun();
                    }
                }
            }
        }
    };
};
//var perTime = new periodTime();

/**
 * 使用描述：
 * perTime.determine({
 *      date:[],    // 日期数组（数据类型为1至31数字）
 *      week:[],    // 星期数组（数据类型为0至6数字）
 *      hours:[],   // 小时数组（数据类型为0至23数字）
 *      within_fun:function(){},    // 条件满足回调函数
 *      outside_fun:function(){}    // 条件不满足回调函数
 * });
 */
