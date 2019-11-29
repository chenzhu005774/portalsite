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
function getInfo(info){
     alert("详情开发中.........."+info)
}

/**
 * 获取淘宝
 */
function getPhone(){
    dataGetter.getPhone("卫衣",function(data){

        var result  =[];
        result =data.result;

        alert(result.length+"条数据");

        //$('pagenumber').innerHTML="1/"+result.length;
        ////var tpl= document.getElementById('item_view').innerHTML;
        //$('listinfo').innerHTML=template("item_view", {data:result});
    },null)
}
/**
 * 新闻
 */
function getNews(){
    dataGetter.getNews("",function(data){

        var result  =[];
        result =data.news;

        alert(result.length+"新闻条数据");

        $('pagenumber').innerHTML="1/"+result.length;
        //var tpl= document.getElementById('item_view').innerHTML;
        $('listinfo').innerHTML=template("item_view", {data:result});
    },null)
}

window.focus();
