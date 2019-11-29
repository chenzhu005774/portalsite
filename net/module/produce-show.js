/**
 * Created by CYT on 2018/7/13.
 */
var params = getRequest();
var curID = params["curID"] || "vas_7";
//var customerID=window.location.href.split('EPG/')[1]?(window.location.href.split('EPG/')[1].split('/')[0]||'004'):'004';
var customerID='004';
var parentCode=customerID;
var oldCurId = "vas_1";
var oldCurId2 = "vas_5";
var navlist=[];
//var USERTOKEN=Authentication.CTCGetConfig("USERTOKEN");
//var USERID=Authentication.CTCGetConfig("UserID");
function init() {
    getPhone();
}
function getPic(){
    dataGetter.getPic(customerID,function(data){
        if(data.data!=null){
             if(!!data.data.cusbackimage || !!data.data.cuslogo){
                //$('bgImg').src=data.data.cusbackimage||"./image/bg.png";
                $('logo').src="https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg";
                //$('logo').src=data.data.cuslogo;

            }
        }
    },null)
}

/**
 * 获取天气
 */
function getPhone(){
    dataGetter.getPhone("手机",function(data){

        var result  =[];
        result =data.result;

        alert(result.length);

    },null)
}


window.focus();
