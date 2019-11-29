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
    setInterval(initTime(),60000);
    getPic();
    getCategory();
    eleMove();
    setCookie('customerID',customerID);
    setCookie('USERTOKEN',USERTOKEN);
    setCookie('USERID',USERID);
    key_effect_opt(curID);
    getWeather();
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
function getWeather(){
    dataGetter.getWeather(USERID,function(data){
        if(data.data.resultcode==200){
           var todayWeather=data.data.result.today;
           $("weather").style.display="block";
           $("weatherTemperature").innerHTML=todayWeather.temperature;
           $("weatherIcon").src="./image/weather_icon/day/"+todayWeather.weather_id.fa+".png"
            //$("weatherText").innerHTML+=todayWeather.weather;
            $("weatherArea").innerHTML="今日"+todayWeather.city+'市';
        }else{
            $("weather").style.display="none";
        }
    })
}
function getCategory(){
    dataGetter.getCategory(parentCode,0,100,customerID,function(data){
        navlist=data.data;
       //console.log(navlist);
        if(data.data.length>0){
            for(var i=0;i<data.data.length;i++){
                if(i<7 && i>0){
                    $('vas_pic_'+i).src=data.data[i].posterurls;
                }
                if(i>0){
                    $('vas_txt_'+i).innerHTML=data.data[i].CATALOGNAME;
                }
            }
            bigPic(navlist[0].CATALOGCODE)
            key_Binds();
			key_focus_opt(curID);
        }
    })
    
}
function bigPic(code){
    dataGetter.getData(code,0,100,function(data){//大图
       // console.log(data)
        if(data.data.length>0){
            $('vas_pic_0').src=data.data[0].smallImageUrl[0].imageUrl;
            elementMap.put("vas_0",{
                "effect":{
                    "blur":{"class":"vas"},
                    "focus":{"class":"vas vas_focus"}},
                "click":{"func":function () {
                        var burl = location.href.split("?")[0];
                        if(!!getRequest().flag){
                            burl+='?index.html&curID='+currentSelectObjectId+"&flag=true";
                        }else{
                            burl+='?index.html&curID='+currentSelectObjectId;
                        }
                         setCookie("clickTitle",data.data[0].name);
                         location.href = goDetail(data.data[0],burl);
                    }},
                "nav":{
                    "up":{"id":''},
                    "down":{"id":"",'func':function(){
                        key_effect_opt(oldCurId);
                    }},
                    "right":{"id":'vas_7'},
                    "left":{"id":''}
                }
            });
            key_effect_opt(curID);
        }
    });
}
function enterMore(){
    var index=currentSelectObjectId.split("_")[1]-0;
    setCookie("clickTitle",navlist[index].CATALOGNAME);
    if(!!getRequest().flag){
        var burl='index.html?curID='+currentSelectObjectId+"&flag=true";
        location.href='list.html?categoryID='+navlist[index].CATALOGCODE+'&customerid='+customerID+'&backurl='+escape(burl)+"&flag=true";
    }else{
        var burl='index.html?curID='+currentSelectObjectId;
        location.href='list.html?categoryID='+navlist[index].CATALOGCODE+'&customerid='+customerID+'&backurl='+escape(burl);
    }
}
function eleMove() {
   
    elementMap.put("vas_1",{
        "effect":{
            "blur":{"class":"vas"},
            "focus":{"class":"vas vas_focus",'func':function(){
                oldCurId=currentSelectObjectId;
            }}},
        "click":{'func':enterMore},
        "nav":{
            "up":{"id":'vas_0'},
            "down":{"id":''},
            "right":{"id":'vas_2'},
            "left":{"id":''}
        }
    });
    elementMap.put("vas_2",{
        "effect":{
            "blur":{"class":"vas"},
            "focus":{"class":"vas vas_focus",'func':function(){
                oldCurId=currentSelectObjectId;
            }}},
            "click":{'func':enterMore},
        "nav":{
            "up":{"id":'vas_0'},
            "down":{"id":''},
            "right":{"id":'vas_3'},
            "left":{"id":'vas_1'}
        }
    });
    elementMap.put("vas_3",{
        "effect":{
            "blur":{"class":"vas"},
            "focus":{"class":"vas vas_focus",'func':function(){
                oldCurId=currentSelectObjectId;
            }}},
            "click":{'func':enterMore},
        "nav":{
            "up":{"id":'vas_0'},
            "down":{"id":''},
            "right":{"id":'vas_4'},
            "left":{"id":'vas_2'}
        }
    });
    elementMap.put("vas_4",{
        "effect":{
            "blur":{"class":"vas"},
            "focus":{"class":"vas vas_focus",'func':function () {
                oldCurId2=currentSelectObjectId;
               
            }}},
            "click":{'func':enterMore},
        "nav":{
            "up":{"id":'vas_7'},
            "down":{"id":''},
            "right":{"id":'vas_5'},
            "left":{"id":'vas_3'}
        }
    });
    elementMap.put("vas_5",{
        "effect":{
            "blur":{"class":"vas"},
            "focus":{"class":"vas vas_focus",'func':function(){
                oldCurId2=currentSelectObjectId;
            }}},
            "click":{'func':enterMore},
        "nav":{
            "up":{"id":"vas_7"},
            "down":{"id":'vas_6'},
            "right":{"id":''},
            "left":{"id":'vas_4'}
        }
    });

    elementMap.put("vas_6",{
        "effect":{
            "blur":{"class":"vas"},
            "focus":{"class":"vas vas_focus"}},
            "click":{'func':enterMore},
        "nav":{
            "up":{"id":"vas_5"},
            "down":{"id":''},
            "right":{"id":''},
            "left":{"id":'vas_4'}
        }
    });
    elementMap.put("vas_7",{
        "effect":{
            "blur":{"class":"vas"},
            "focus":{"class":"vas vas_focus"}},
        "click":{"func":function () {
                var ip=getDomain();
                if(Authentication.CTCGetConfig("EPGDomain").indexOf('/iptvepg/')>-1){
                    var backUrl = ip+'/iptvepg/frame1066/portal.jsp';
                    location.href=ip+'/iptvepg/frame1046/portal.jsp?from=hyyy&backUrl='+backUrl;
                }else{
                    location.href=ip+'/EPG/jsp/lutong01/en/Category.jsp?from=hyyy&backUrl='+Authentication.CTCGetConfig("EPGDomain");
                }
            }},
        "nav":{
            "up":{"id":""},
            "down":{"func":function(){
                key_effect_opt(oldCurId2);
            }},
            "right":{"id":''},
            "left":{"id":'vas_0'}
        }
    });
}

window.focus();
