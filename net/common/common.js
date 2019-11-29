//过滤2边空格与换行符
String.prototype.trim=function() { 
  return this.replace(/<\/?.+?>/g,"").replace(/[\r\n]/g,"").replace(/(^\s*)|(\s*$)/g,""); 
} 

//过滤json特殊字符
String.prototype.jsonTrim=function() { 
  return this.replace(/\r/g,' ').replace(/\n/g,' ');
} 

//批量替换
String.prototype.replaceAll = function(s1, s2){
  return this.replace(new RegExp(s1, "gm"), s2)
}

//元素封装
function eleClass(){
	this.id="";
	this.obj=null;
	//初始化
	this.init=function(id){
		this.id=id;
		var tempObj = document.getElementById(id);
		if(typeof(tempObj)=="object" && tempObj!=null)
			this.obj=tempObj;
		return this;
	};
	
	//获取JS元素
	this.getObj=function(){
		return this.obj;
	};
	
	//显示
	this.show=function(){
	    if(typeof(this.obj)=="object" && this.obj!=null && this.obj.style.display !="block"){
		       this.obj.style.display="block";
		}
		return this;
	};
	
	//隐藏
	this.hide=function(){
	    if(typeof(this.obj)=="object" && this.obj!=null && this.obj.style.display !="none"){
		       this.obj.style.display="none";
		}
		return this;
	};
	
	//读取，写入html
	this.html=function(val){
		if(typeof(val)!="undefined"){
			if(typeof(this.obj)=="object" && this.obj!=null)
				this.obj.innerHTML = val;
			return this;
		}else{
			if(typeof(this.obj)=="object" && this.obj!=null)
				return this.obj.innerHTML;
			else
				return "";
		}
	};
	
	//html累加 isbefore是否增加至最前，默认后累加
	this.addHtml=function(val,isbefore){
		if(typeof(val)!="undefined" && typeof(this.obj)=="object" && this.obj!=null){
			   if(isbefore)
				   this.obj.innerHTML = val+ this.obj.innerHTML;
			   else
				   this.obj.innerHTML += val;
		}
		return this;
	};
	
	//读取，写入值
	this.value=function(val){
		if(typeof(val)!="undefined"){
			if(typeof(this.obj)=="object" && this.obj!=null)
				this.obj.value = val;
			return this;
		}else{
			if(typeof(this.obj)=="object" && this.obj!=null)
				return this.obj.value;
			else
				return "";
		}
	};
	
	//value累加 isbefore是否增加至最前，默认后累加
	this.addValue=function(val,isbefore){
		if(typeof(val)!="undefined" && typeof(this.obj)=="object" && this.obj!=null){
			   if(isbefore)
				   this.obj.value = val+ this.obj.value;
			   else
				   this.obj.value += val;			
		}
		return this;
	};
	
	//读取，写入样式
	this.style=function(val){
		if(typeof(val)!="undefined"){
			if(typeof(this.obj)=="object" && this.obj!=null)
				this.obj.style.cssText = val;
			return this;
		}else{
			if(typeof(this.obj)=="object" && this.obj!=null)
				return this.obj.style.cssText;
			else
				return "";
		}
	};
	
	//累加样式
	this.addStyle=function(val){
		if(typeof(val)!="undefined" && typeof(this.obj)=="object" && this.obj!=null){
			this.obj.style.cssText += " "+val;
		}
		return this;
	};
	
	//移除样式
	this.removeStyle=function(val){
		if(typeof(val)!="undefined" && typeof(this.obj)=="object" && this.obj!=null){
				this.obj.style.cssText = this.obj.style.cssText.replace(val,"");
		}
		return this;
	};
	
	//读取，写入样式名
	this.className=function(val){
		if(typeof(val)!="undefined"){
			if(typeof(this.obj)=="object" && this.obj!=null)
				this.obj.className = val;
			return this;
		}else{
			if(typeof(this.obj)=="object" && this.obj!=null)
				return this.obj.className;
			else
				return "";
		}
	};
	
	//累加样式名
	this.addClassName=function(val){
		if(typeof(val)!="undefined" && typeof(this.obj)=="object" && this.obj!=null && this.obj.className.indexOf(val)<0)
			this.obj.className += " "+val;
		return this;
	};
	
	//移除样式名
	this.removeClassName=function(val){
		if(typeof(val)!="undefined" && typeof(this.obj)=="object" && this.obj!=null){
			this.obj.className = this.obj.className.replace(val,"");
		}
		return this;
	};
	
	//读取，写入属性
	this.attr=function(key,val){
		if(typeof(val)!="undefined"){
			if(typeof(this.obj)=="object" && this.obj!=null && typeof(key)!="undefined"){
				if(typeof(this.obj.getAttribute)=="function")
				 this.obj.setAttribute(key,val);
				else
				 this.obj[key]=val;
			}
			return this;
		}else{
			if(typeof(this.obj)=="object" && this.obj!=null && typeof(key)!="undefined"){
				if(typeof(this.obj.getAttribute)=="function"){
					var attrVal = this.obj.getAttribute(key);
					if(typeof(attrVal)=="undefined"){
						 attrVal = this.obj[key];
					}
					return attrVal;
				}else{
					return this.obj[key];
					
				}
			}else{
				return "";
			}
		}
	};
	
	//读取，写入样式属性
	this.styleAttr=function(key,val){
		if(typeof(val)!="undefined"){
			if(typeof(this.obj)=="object" && this.obj!=null && typeof(key)!="undefined")
				this.obj.style[key]=val;
			return this;
		}else{
			if(typeof(this.obj)=="object" && this.obj!=null && typeof(key)!="undefined")
				return this.obj.style[key];
			else
				return "";
		}
	};
	
	//移除样式属性
	this.removeStyleAttr=function(key){
			if(typeof(this.obj)=="object" && this.obj!=null && typeof(key)!="undefined"){
				if(typeof(this.obj.style.removeProperty)=="function"){
	  	  	 this.obj.style.removeProperty(key);
	  	  }else{
	  	  	this.obj.style[key]="";
	  	  }
			}
			return this;
	};
	
	
	//是否活跃元素
	this.isActive=function(){
	    if(typeof(this.obj)=="object" && this.obj!=null && this.obj.style.display !="none"){
		       return true;
		}
		return false;
	};
	
}

//获得元素对象
function ele(elementId){
  var obj = new eleClass();
  return obj.init(elementId);
}



//初始化导航，防止直接跳首页
function initNavigationUrl(){ 
  setCookie("nav",""); 
}
//增加导航
function addNavigationUrl(url){
	var nav = getCookie("nav");
	var navUrlStr = "";
	var navUrlArray = null;
	if(nav==null || nav.length<1){
		navUrlArray = new Array();
	}else{
		navUrlArray = nav.split(',');
	}
	if(navUrlArray.length>0){
		//如果已存在地址，则不记录数组
		if(navUrlArray[navUrlArray.length-1]==url){
           return; 
		}
	}
	var temp = url.split("?");
	url = temp[0];
	if(temp.length>1)
		url += "?" + encodeURI(temp[1]);
	navUrlArray.push(url);
	navUrlStr= navUrlArray.join(","); 
	setCookie("nav",navUrlStr); 
}

//跳转上一导航
function gotoBackNavigationUrl(){
	var nav = getCookie("nav");
	var navUrlStr = "";
	var navUrlArray = null;
	var url = "";
	if(nav!=null){
		navUrlArray = nav.split(',');
        if(navUrlArray.length>0){
           url=navUrlArray.pop();
           if(url.length<1 && navUrlArray.length>0)
        	   url=navUrlArray.pop();
           navUrlStr=navUrlArray.join(","); 
           setCookie("nav",navUrlStr);
           if(url.length>0){
             window.location.href = url;
           }
        }
	}
}

//获取最后导航地址
function getLastNavigationUrl(){
	var url = "";
	var nav = getCookie("nav");
	if(nav!=null){
		var navUrlArray = nav.split(',');
        if(navUrlArray.length>0){
        	url=navUrlArray[navUrlArray.length-1];
        }
	}
	return url;
}

//获取实际返回地址
function getBackNavigationUrl(){
  var lastUrl = getLastNavigationUrl();
  var currentUrl = window.location.href;
  var reUrl="";
  //如果同一个页面
  if(lastUrl.split("?")[0]==currentUrl.split("?")[0]){
	  reUrl=lastUrl;
	  var nav = getCookie("nav");
	  var navUrlArray = nav.split(',');
	  navUrlArray.pop();
	  var navUrlStr=navUrlArray.join(","); 
      setCookie("nav",navUrlStr);
  }
  return reUrl;
}


//时间格式化
function timeFormat(time) {
      var hour = parseInt(time / 3600);
      time = parseInt(time % 3600);
      var minute = parseInt(time / 60);
      time = parseInt(time % 60);
      var second = parseInt(time);

      var timeStr = "";
      if (hour < 10)
          timeStr += "0";
      timeStr += hour + ":";
      if (minute < 10)
          timeStr += "0";
      timeStr += minute+":";
      if (second < 10)
          timeStr += "0";
      timeStr += second;
      return timeStr;
  }

//跳转页面
function gotoPage(url){
	window.location.href = url;
}

//设置cookie
function setCookie(key,val){
    var Days = 7; //此 cookie 将被保存 7 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie=key +"="+escape(val)+";expires="+exp.toGMTString()+";path=/";
};

//获取cookie
function getCookie(objName){//获取指定名称的cookie的值
	var arrStr = document.cookie.split("; ");
	for(var i = 0;i < arrStr.length;i ++){
	var temp = arrStr[i].split("=");
		if(temp[0] == objName) return unescape(temp[1]);
	} 
}

//删除cookie
function delCookie(key){
	//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
	var date = new Date(); 
	date.setTime(date.getTime()-10000); 
	document.cookie=key+"=;expires="+date.toGMTString()+";path=/"; 
} 

//获取数组下标
function getItemIndex(index,arraylen){
   var maxIndex = arraylen-1;
   if(index<0)
      index = arraylen+index;
   if(index>maxIndex)
       index = index-arraylen;
   return index;    
}



//获取导航ID里的下标
function getNavIdNum(idStr,replaceKey){
	return parseInt(idStr.replace(replaceKey,""),10);
}

//get方式请求AJAX
function ajaxGet(url,callBack){
	var xmlhttp;
	var responseText="";
	if(window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
	  if(xmlhttp.readyState==4 && xmlhttp.status==200){
		  if(typeof(callBack)=="function")
		   callBack(xmlhttp.responseText.jsonTrim());
	  }
	}
	if(typeof(callBack)=="function")
	  xmlhttp.open("GET",url,true);
	else
	  xmlhttp.open("GET",url,false);
	xmlhttp.send();
	return xmlhttp.responseText.jsonTrim();
}

//post方式请求AJAX
function ajaxPost(url,content,callBack)
{
	var xmlhttp;
	var responseText="";
	if(window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
	  if(xmlhttp.readyState==4 && xmlhttp.status==200){
		  if(typeof(callBack)=="function")
		   callBack(xmlhttp.responseText.jsonTrim());
	  }
	}
	if(typeof(callBack)=="function")
	  xmlhttp.open("POST",url,true);
	else
	  xmlhttp.open("POST",url,false);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send(content);
	return xmlhttp.responseText.jsonTrim();
}

 
 //数据调用通道
 function iframeData(url){
	 if(ele("dataIFrame").getObj()==null){
	     var iframeDivObjTemp = document.createElement("div");
	     iframeDivObjTemp.innerHTML = '<iframe id="dataIFrame" width="0" height="0" src="' + url + '" style="border:0px"></iframe>';
	     document.body.appendChild(iframeDivObjTemp);
	 }else{
		 window.frames["dataIFrame"].location.href=url;
	 }
 }
 
 //数据调用通道2
 function iframeData2(url){
	 if(ele("dataIFrame2").getObj()==null){
	     var iframeDivObjTemp = document.createElement("div");
	     iframeDivObjTemp.innerHTML = '<iframe id="dataIFrame2" width="0" height="0" src="' + url + '" style="border:0px"></iframe>';
	     document.body.appendChild(iframeDivObjTemp);
	 }else{
		 window.frames["dataIFrame2"].location.href=url;
	 }
 }
 
 //数据调用通道3
 function iframeData3(url){
	 if(ele("dataIFrame3").getObj()==null){
	     var iframeDivObjTemp = document.createElement("div");
	     iframeDivObjTemp.innerHTML = '<iframe id="dataIFrame3" width="0" height="0" src="' + url + '" style="border:0px"></iframe>';
	     document.body.appendChild(iframeDivObjTemp);
	 }else{
		 window.frames["dataIFrame3"].location.href=url;
	 }
 }
 
 //数据调用通道4
 function iframeData4(url){
	 if(ele("dataIFrame4").getObj()==null){
	     var iframeDivObjTemp = document.createElement("div");
	     iframeDivObjTemp.innerHTML = '<iframe id="dataIFrame4" width="0" height="0" src="' + url + '" style="border:0px"></iframe>';
	     document.body.appendChild(iframeDivObjTemp);
	 }else{
		 window.frames["dataIFrame4"].location.href=url;
	 }
 }
 
//setTimeoutFuncObj:定时对象   timeFuncStr: 定时执行方法（字符串）  time:时间(ms) isFrontRun:是否定时前执行一次
function setTimeoutFunction(setTimeoutFuncObj,timeFuncStr,time,isFrontRun,frontFunc){
	var tempSetTimeoutFuncObj = null;
	clearSetTimeoutFunction(setTimeoutFuncObj);
	if(typeof(frontFunc)=="function")
		frontFunc();
    if(isFrontRun)
      eval(timeFuncStr);	
    tempSetTimeoutFuncObj = setTimeout(timeFuncStr,time); //毫秒
    return tempSetTimeoutFuncObj;
}

//清理定时方法
function clearSetTimeoutFunction(setTimeoutFuncObj,endFunc){
  if(setTimeoutFuncObj!=null){
    clearTimeout(setTimeoutFuncObj);
    setTimeoutFuncObj = null;
  }
  if(typeof(endFunc)=="function")
	  endFunc(); 
}

//setIntervalFuncObj:定时对象   timeFuncStr: 定时执行方法（字符串）  time:时间(ms) isFrontRun:是否定时前执行一次
function setIntervalFunction(setIntervalFuncObj,timeFuncStr,time,isFrontRun,frontFunc){
	var tempSetIntervalFuncObj = null;
	clearSetIntervalFunction(setIntervalFuncObj);
	if(typeof(frontFunc)=="function")
		frontFunc();
    if(isFrontRun)
      eval(timeFuncStr);	
    tempSetIntervalFuncObj = setInterval(timeFuncStr,time); //毫秒
    return tempSetIntervalFuncObj;
}

//清理定时方法
function clearSetIntervalFunction(setIntervalFuncObj,endFunc){
  if(setIntervalFuncObj!=null){
	clearInterval(setIntervalFuncObj);
    setIntervalFuncObj = null;
  }
  if(typeof(endFunc)=="function")
	  endFunc(); 
}


//object转str
function objectToStr(jsonObj){
 var reStr="";
 if(jsonObj!=null && typeof(jsonObj)=="object"){
	 var beginStr = "{";
	 var endStr = "}";
	 if(Object.prototype.toString.call(jsonObj) === '[object Array]'){
		 beginStr = "[";
		 endStr = "]";
	 }	
	 for(var item in jsonObj){
		 //JSON 对象
		 if(!(item>=0)){
			 reStr += "'"+ item + "':";
		 }
		 var type=typeof(jsonObj[item]);
		 if(type=="number"){
			 reStr +=jsonObj[item];
		 }else if(type=="object"){
			 reStr += objectToStr(jsonObj[item]);
		 }else{
			 reStr +="'"+jsonObj[item]+"'"; 
		 }
		 reStr +=",";
	 }
	 if(reStr.length>0)
		 reStr = reStr.substr(0,reStr.length-1);
	 reStr = beginStr+reStr+endStr;
 }
 return reStr;
}

//获取字符串真实长度,中文字符算2长度
function getStrRealLen(str)
{  
    if(str==null)
    	return 0;
    var len = 0;
    var strLen = str.length;
    for(var i = 0;i<strLen;i++){
         a = str.charAt(i);
         len++;
         if(escape(a).length > 4)
         {//中文字符的长度经编码之后大于4
        	 len++;
          }          
     }
     return len;
}

//截取字符串,中文字符算2长度
function getSubStr(str,len,isSuffix)
{  
    if(str==null)
    	return "";
    var realLen = getStrRealLen(str);
    if(realLen<=len){
    	return str;
    }else{
        var str_length = 0;
        var str_cut = new String();
        var str_len = str.length;
        if(isSuffix)
        	len -=3; 
        for(var i = 0;i<str_len;i++){
            var a = str.charAt(i);
             str_length++;
             if(escape(a).length > 4)
             {
              //中文字符的长度经编码之后大于4
              str_length++;
              }
              str_cut = str_cut.concat(a);
              if(str_length>=len)
              {
            	 if(isSuffix){ 
                      str_cut = str_cut.concat("...");
            	 }
                 return str_cut;
              }
         }
         //如果给定字符串小于指定长度，则返回源字符串；
         if(str_length<len)
         	return  str;    	    	
    }
}

//获取元素位置 
//index:下标,maxColumn:每行几列,initLeft:起始左边,initTop:起始高度,columnScale:列间隔,rowScale:行间隔
  function getElePosition(index,maxColumn,initLeft,initTop,columnScale,rowScale){
      var left = initLeft+(index%maxColumn)*columnScale;	
  	   var row = Math.floor(index/maxColumn);
      var tops = initTop+row*rowScale;
  	   return {"left":left,"top":tops};
  }
  
  //数字补0 
  //initNumStr:初始化字符串,num:需要格式化数字
  function numSupplyZero(initNumStr,num){
	  var len=initNumStr.length;
	  initNumStr +=num;
	  return initNumStr.substring(initNumStr.length-len);
  }
  
//获取总页数
  function getPageTotal(totalNum,maxNum){
	  return Math.ceil(parseInt(totalNum,10)/parseInt(maxNum,10));
  }

  //获取对象分页列表
  function getSliceList(objs,pageIndex,pageSize){
     var tempObj=objs;
     if(objs!=null && typeof(objs)=="object" && objs.length>0){
        pageIndex = parseInt(pageIndex,10);
        pageSize =  parseInt(pageSize,10);
        var len = objs.length;
        if(pageIndex>0 && pageSize>0 && len>0){
           var begin = pageSize*(pageIndex-1);
           if(begin<0)
              begin=0;
           var end = pageSize*pageIndex;
           if(end>len)
              end = len;
           tempObj = objs.slice(begin,end); 
        }
     }
     return tempObj;
  }

  //建立ifrmae
  function createIframe(divId,src){
	    var iframe = document.createElement("iframe");
	    var ifrId= divId+"_ifr";
	    iframe.id=ifrId;
	    iframe.onload = function(){iframeLoad(ifrId);}
	    iframe.src = src;
	    iframe.frameborder="0";
	    iframe.scrolling="no";
	    iframe.width="720";
	    iframe.height="576";
	    iframe.allowtransparency="true";
	    iframe.style="background:transparent";
	    ele(divId).getObj().appendChild(iframe);
	}
  
  //获取日期差值
  function getDayNum(dateStr){
    var currentDateObj = new Date();
    var dateObj = new Date();
    var strs = dateStr.split("-");
    dateObj.setFullYear(strs[0]);
    dateObj.setMonth(parseInt(strs[1],10)-1);
    dateObj.setDate(parseInt(strs[2],10));
    //alert(dateObj.toLocaleString()+ " "+currentDateObj.toLocaleString());
    var difference = (dateObj.getTime()-currentDateObj.getTime())/86400000;
    if(difference>-1)
      difference++;
    return difference;
  }
  
//ipannel 跳转
  function returnIpannel(root,url){
  	//top.window.location.href
  	window.location.href = root+"/sdCloudPortal/plug/ipanel/returnIpanel.htm?HTTPCHANGEURL="+escape(url);
  }

  //ipannel 跳转返回
  function ipannelReturn(){
     window.location.href = "ui://vod_blank.htm";
  }

  //直播跳转
  function returnLive(){
	 if(typeof(localStorage)=="object" && localStorage!=null){
	  	var src = "http://"+localStorage.aimIp+":"+localStorage.aimPort+"/invoke/logout?spId=1001&sessionId="+localStorage.sessionId+"&messageInfo=null";
	  	window.location.href = src;
	 }
  }
  
//海报投影   
function invertedImage(id){
  var obj = ele(id);
  var eleObj=obj.getObj();
  //元素不存在跳出
  if(eleObj==null){
    return;
  }
  var imgPath = ele(id+"_img").attr("src");
  //加入没有赋_img的元素，则默认取区域里第一个图片做背景
  if(imgPath==null || imgPath.length<1){
   var imgObj=eleObj.getElementsByTagName("img")[0];
   if(typeof(imgObj.getAttribute)=="function")
     imgPath=imgObj.getAttribute("src");
   else
     imgPath=imgObj["src"];
  }
  for(var j=0,o=40;j<50;j++,o-=1.4){
     obj.addHtml("<div class='onePx' style='top:"+(235+j)+"px;"+"opacity:"+o/100+"'><div class='imgDiv' style='margin-top:"+(-221+j)+"px; background-image:url("+imgPath+")'></div></div>");
  }  
}
  
  //循环滚动
  var rollingCycle={
     areaId:"", //区域ID
     maxScroll:90, //最大滚动区域
     waitScroll:0, //停顿区域
     position:"top", //方位
     isAutofill:true, //是否填充
     speed:20, //速度
     rollingCycleIntervalObj:null, //定时器对象
     areaObj:null,
     realityObj:null,
     
     //初始化
     init:function(obj){
       if(typeof(obj)=="object" && obj!=null){
          for(var item in obj){
            var itemObj = obj[item];
		     if(itemObj==null || itemObj=="")
				continue;
			 switch(item){
				case "areaId":
				     this.areaId = itemObj;
					 break;
				case "maxScroll":
				     this.maxScroll = itemObj;
					 break;
				case "waitScroll":
				     this.waitScroll = itemObj;
					 break;
				case "position":
				     this.position = itemObj;
					 break;
				case "isAutofill":
				     this.isAutofill = itemObj;
					 break;
				case "speed":
				     this.speed = itemObj;
					 break;					 
		     }
          }
          if(this.areaId.length>0){
             this.areaObj = ele(this.areaId);
             //元素存在，再进行滚动
             if(this.areaObj!=null){
                realityObj = this.areaObj.getObj();
	              //是否自动填充
	              if(this.isAutofill)
	                this.areaObj.addHtml(this.areaObj.html());
	              if(this.rollingCycleIntervalObj)
	                 clearInterval(this.rollingCycleIntervalObj);
                  this.distribute();
             }
          }
       }
     },
     
     //滚动分配
     distribute:function(){
        switch(this.position){
          case "up":
           this.rollingCycleIntervalObj=setInterval("rollingCycle.rollingCycleTop()",this.speed); 
           break;
          case "down":
           this.rollingCycleIntervalObj=setInterval("rollingCycle.rollingCycleDown()",this.speed); 
           break;
          case "left":
           this.rollingCycleIntervalObj=setInterval("rollingCycle.rollingCycleLeft()",this.speed); 
           break;
          case "right":
           this.rollingCycleIntervalObj=setInterval("rollingCycle.rollingCycleRight()",this.speed); 
           break;
        }
     },
     
     
     //上滚
     rollingCycleTop:function(){
	      var scrollTop = parseInt(realityObj.scrollTop,10); 
	      if(scrollTop>=this.maxScroll){
	          realityObj.scrollTop=0;
	      }else{
		      if(this.waitScroll>0 && scrollTop%this.waitScroll==0){
		       	   clearInterval(this.rollingCycleIntervalObj);
		       	   setTimeout("rollingCycle.continueRollingCycleTop()",3500);
		      }else{
		          realityObj.scrollTop=(scrollTop+1);
		      }
	      }
     },
     
     //继续上滚动
     continueRollingCycleTop:function(){
	      realityObj.scrollTop=parseInt(realityObj.scrollTop,10)+1;
	      this.rollingCycleIntervalObj=setInterval("rollingCycle.rollingCycleTop()",this.speed);
     },
     
     //下滚
     rollingCycleDown:function(){
	      var scrollTop = parseInt(realityObj.scrollTop,10); 
	      if(scrollTop==0){
	          realityObj.scrollTop=this.maxScroll;
	      }else{
		      if(this.waitScroll>0 && scrollTop%this.waitScroll==0){
		       	   clearInterval(this.rollingCycleIntervalObj);
		       	   setTimeout("rollingCycle.continueRollingCycleDown()",3500);
		      }else{
		          realityObj.scrollTop=(scrollTop-1);
		      }
	      }
     },
     
     //继续下滚动
     continueRollingCycleDown:function(){
	      realityObj.scrollTop=parseInt(realityObj.scrollTop,10)-1;
	      this.rollingCycleIntervalObj=setInterval("rollingCycle.rollingCycleDown()",this.speed);
     },
     
     //左滚
     rollingCycleLeft:function(){
	      var scrollLeft = parseInt(realityObj.scrollLeft,10); 
	      if(scrollLeft>=this.maxScroll){
	          realityObj.scrollLeft=0;
	      }else{
		      if(this.waitScroll>0 && scrollLeft%this.waitScroll==0){
		       	   clearInterval(this.rollingCycleIntervalObj);
		       	   setTimeout("rollingCycle.continueRollingCycleLeft()",3500);
		      }else{
		          realityObj.scrollLeft=(scrollLeft+1);
		      }
	      }
     },
     
     //继续左滚动
     continueRollingCycleLeft:function(){
	      realityObj.scrollLeft=parseInt(realityObj.scrollLeft,10)+1;
	      this.rollingCycleIntervalObj=setInterval("rollingCycle.rollingCycleLeft()",this.speed);
     },
     
     //右滚
     rollingCycleRight:function(){
	      var scrollLeft = parseInt(realityObj.scrollLeft,10); 
	      if(scrollLeft==0){
	          realityObj.scrollLeft=this.maxScroll;
	      }else{
		      if(this.waitScroll>0 && scrollLeft%this.waitScroll==0){
		       	   clearInterval(this.rollingCycleIntervalObj);
		       	   setTimeout("rollingCycle.continueRollingCycleRight()",3500);
		      }else{
		          realityObj.scrollLeft=(scrollLeft-1);
		      }
	      }
     },
     
     //继续右滚动
     continueRollingCycleRight:function(){
	      realityObj.scrollLeft=parseInt(realityObj.scrollLeft,10)-1;
	      this.rollingCycleIntervalObj=setInterval("rollingCycle.rollingCycleRight()",this.speed);
     }
     
  };
  
  //文字滚动
  var scrollText={
     scrollId:"", //文字区域ID
     enTextLen:0,  //显示英文字符长度,能正常展示文字个数，1个中文代表2
	 enSingleWidth:10, //单个字体宽度,等于样式里的font-size/2 
	 moveSpacing:2,   //移动间隔
	 timeDelayScroll:0, //延时滚动 	 	
     timeSpacing:150, //滚动时间间隔
	 directionScroll:-1,  //方向 -1 左移  1 右移
	 setTimeScrollTextObj:null, //定时器对象
	 setIntervalScrollTextObj:null,  //定时器对象
	 eleObj:null, //对象
	 realityObj:null,
	
	//初始化
	init:function(obj){
	  if(typeof(obj)=="object" && obj!=null){
           for(var item in obj){
             var itemObj = obj[item];
		     if(itemObj==null || itemObj=="")
				continue;
			 switch(item){
			    case "scrollId":
			      this.scrollId=itemObj;
			      break;
			    case "enTextLen":
			      this.enTextLen=itemObj;
			      break;  
			    case "enSingleWidth":
			      this.enSingleWidth=itemObj;
			      break; 
			    case "moveSpacing":
			      this.moveSpacing=itemObj;
			      break; 
			    case "timeSpacing":
			      this.timeSpacing=itemObj;
			      break;			       				      		      
			 }
		   }
		   
		   if(this.scrollId.length>0){
              this.eleObj = ele(this.scrollId);
              //元素存在，再进行滚动
              if(this.eleObj!=null){
                 this.realityObj = this.eleObj.getObj();
                 if(this.eleObj.attr("title")!=null && this.eleObj.attr("title").indexOf(",")>-1){
                	 this.eleObj.html(this.eleObj.attr("title").split(",")[1]); 
                 }
                 this.timeDelay(); 
              }
           }
	  }	   	 
	},
	
	//滚动文字
	timeDelay:function(){
		if(this.setTimeScrollTextObj!=null){
			clearTimeout(this.setTimeScrollTextObj);
		}
		this.scrollTextLen = getStrRealLen(this.eleObj.html());
		if(this.scrollTextLen>this.enTextLen){			
			this.scrollWidth = (this.scrollTextLen-this.enTextLen)*this.enSingleWidth;
			if(this.timeDelayScroll>0)
			  this.setTimeScrollTextObj=setTimeout("scrollText.scrollText()",this.timeDelayScroll);
			else
			  this.scrollText();  
		}
	},

	//滚动文字处理
	scrollText:function(){
	  if(this.setIntervalScrollTextObj)
	    clearInterval(this.setIntervalScrollTextObj);
	  this.setIntervalScrollTextObj=setInterval("scrollText.moveScrollText()",this.timeSpacing);
	},

	//移动滚动文字
	moveScrollText:function(){
		var left = this.eleObj.styleAttr("left");
		if(left==null || left.length<1)
		   left = 0;
		left = parseInt(left,10);
		if(left<-(this.scrollWidth+10)){
		   this.directionScroll = 1;
		}else if(left > 3){
		   this.directionScroll = -1;
		}
		var scrollMoveLeft = left+ (this.directionScroll*this.moveSpacing);
		this.eleObj.styleAttr("left",scrollMoveLeft +"px");
	},

	//位置还原
	revert:function(){
	    if(this.setIntervalScrollTextObj)
		  clearInterval(this.setIntervalScrollTextObj);
	    if(this.eleObj!=null){
          if(this.eleObj.attr("title")!=null && this.eleObj.attr("title").indexOf(",")>-1){
           	 this.eleObj.html(this.eleObj.attr("title").split(",")[0]); 
          }
		  this.eleObj.styleAttr("left","0px");
	    }
	}
   };
