/**
 * Created by CYT on 2018/5/14.
 */
/*获取epgDomain*/
function getDomain(){
    try{
        var domain = Authentication.CTCGetConfig("EPGDomain");
        var start = 0;
        if(domain.indexOf("https")>-1)start=8;
        else if((domain.indexOf("http")>-1))start=7;
        var tmp = domain.substring(start, domain.length);
        var result = domain.substring(0, tmp.indexOf("/")+start);
        return result;
    }catch(e){
        return "";
    }
}
function getCookie(objName){//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
    var temp = arrStr[i].split("=");
        if(temp[0] == objName) return unescape(temp[1]);
    } 
}
/*实时刷新时间*/
function initTime(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1; //取月的时候取的是当前月-1如果想取当前月+1就可以了
    var date =now.getDate();
    var hour =now.getHours();
    var min =now.getMinutes();
    if(hour==0&&min==0||hour==6&&min==0||hour==12&&min==0||hour==18&&min==0){
        getWeather();
    }
    var day = ['日','一','二','三','四','五','六'];
    if(hour>12){
       /*  hour-=12; */
        var timing='PM';
    }else{
        var timing='AM';
    }
    var timeMsg =' <p class="timeStr">'+
                    '<span id="timeBox">'+fnW(hour) +':' + fnW(min)+'</span>'+
                    '<span id="timeZone">'+timing+'</span>'+
                '</p>'+
                '<p class="timeData">'+
                    '<span class='+"time_span"+'>星期' + day[now.getDay()]+'</span>'+
                    '<span id="dateStr">'+ year + '-' + fnW(month) + '-' + fnW(date) + '</span>'+
                '</p>'
    $('time_box').innerHTML = timeMsg ;
    // document.getElementById("dateStr").innerHTML
    return initTime;
}
//
/*补0处理*/
function fnW(str){
    var num;
    str>=10?num=str:num="0"+str;
    return num;
}
function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
function $(_ID){
    return document.getElementById(_ID);
}

function getUrlParam(key) {
    var url = window.location.search;
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = url.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}

function goDetail(obj,burl){
    var url='';
    switch (obj.contentType){
        case 2://全图
            if(!!getRequest().flag){
                url="detail_pic.html?categoryID="+obj.catalogCode+"&contentID="+obj.contentID+"&backurl="+escape(burl)+"&flag=true";
            }else{
                url="detail_pic.html?categoryID="+obj.catalogCode+"&contentID="+obj.contentID+"&backurl="+escape(burl);
            }
            break;
        case 3://纯文本和图文
            if(!!getRequest().flag){
                url="detail_text.html?categoryID="+obj.catalogCode+"&contentID="+obj.contentID+"&backurl="+escape(burl)+"&flag=true";
            }else{
                url="detail_text.html?categoryID="+obj.catalogCode+"&contentID="+obj.contentID+"&backurl="+escape(burl);
            }
            break;
        case 1:   //视频
            if(Authentication.CTCGetConfig("EPGDomain").indexOf('/iptvepg/')>-1){
                url=getDomain()+"/iptvepg/frame1068/play/play_control_industry.jsp?CODE="+obj.fileURL+"&PARENTCODE="+obj.fileURL+"&USERID="+getCookie('USERID')+"&USERTOKEN="+getCookie('USERTOKEN')+"&PLAYTYPE=1"+"&TYPEID="+obj.catalogCode+"&ISAUTHORIZATION=0"+"&ISPLAYNEXT=0"+"&ISRECODEPLAY=1"+"&BACKURL="+escape(burl);
            }else{
                url=getDomain()+"/EPG/jsp/zhuoying1/en/play/play_control_industry.jsp?CODE="+obj.fileURL+"&PARENTCODE="+obj.fileURL+"&USERID="+getCookie('USERID')+"&USERTOKEN="+getCookie('USERTOKEN')+"&PLAYTYPE=1"+"&TYPEID="+obj.catalogCode+"&ISAUTHORIZATION=0"+"&ISPLAYNEXT=0"+"&ISRECODEPLAY=1"+"&BACKURL="+escape(burl);
            }   
            
        break;
    }
    return url;
}
