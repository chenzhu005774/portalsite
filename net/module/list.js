var params = getRequest();
var customerID = getCookie('customerID') || '004';
var curID = params['curID'] || 'left_item_0';
var backurl = params["backurl"] || "index.html";
var categoryCode = params['categoryID'];
var curPage = params["curPage"] || 1;//左边页码
var rightPage=params["rightPage"] || 1;//右边页码
var allPage=1;
var pageSize = 7;
var totalPage = 1;//左边
var leftOld = 'left_item_0';
var curSelect = {
    page:params["curPage"]|| 1,
    id: params["curSelect"]||'left_item_0'
};
var callbackFunc = undefined;
var navList=[];
var timeout=null;
function init() {
    //key_Binds();
    if(!!params['isEnter']){
        curSelect.id=params['leftSelect'];
    }
    if(!!params['isFlag'] && params['isFlag']!=undefined){
        curID=curSelect.id;
        key_effect_opt(curID);
    }
    getLeftNav();
    getPic();
    btnMove();
    pageNav();
    setInterval(initTime(), 60000);
}

function getPic() {
    dataGetter.getPic(customerID, function (data) {
        if (data.data != null) {
            if (!!data.data.cusbackimage || !!data.data.cuslogo) {
                $('bgImg').src = data.data.cusbackimage;
                $('logo').src = data.data.cuslogo;
            }
        }
    })
}

function getLeftNav(callbackFunc) {//左边数据
    $('leftNav').innerHTML = '';
    //document.onkeydown=null;
    dataGetter.getCategory(categoryCode, curPage, pageSize, customerID, function (data) {
        if (!!data.data && data.data.length > 0) {
            key_Binds();
            navList = data.data;
            totalPage = (Math.ceil(data.totalSize / pageSize));
            var len = navList.length;
            for (var i = 0, str = ''; i < 7; i++) {
                if (i < len) {
                    str += '<div id="left_item_' + i + '" class="left_item" style="top:' + (i * 68) + 'px" data-code="'+navList[i].CATALOGCODE+'">' +
                        '<img class="focus_img" src="image/list/nav_focus.png" alt="">' +
                        '<img class="select_img" src="image/list/selscted.png" alt="">' +
                        '<div class="left_name">' +
                        '<img class="icon" src="image/list/icon.png" alt="">' +
                        '<div id="nav_name_' + i + '" class="nav_name">' + navList[i].CATALOGNAME + '</div>' +
                        '</div>' +
                        '</div>';
                    elementMap.put('left_item_' + i, {
                        "notRecordUrl": true,
                        'navList':navList,
                        "effect": {
                            "blur": {
                                "func": function () {
                                    if (currentSelectObjectId == curSelect.id && curPage == curSelect.page) {
                                        return $(currentSelectObjectId).className = 'left_item select';
                                    }
                                    $(currentSelectObjectId) && ($(currentSelectObjectId).className = 'left_item');
                                }
                            },
                            "focus": {
                                "func": function () {
                                    if (currentSelectObjectId == curSelect.id && curPage == curSelect.page) {
                                        return $(currentSelectObjectId).className = 'left_item select focus';
                                    }
                                    $(currentSelectObjectId) && ($(currentSelectObjectId).className = 'left_item focus');
                                     leftClick();
                                }
                            }
                        },
                        "nav": {
                            "up": {
                                "func": leftUp
                            },
                            "down": {
                                'func': leftDown
                            },
                            "right": {'id':'text_item_0,pic_item_0,card_item_0'},
                            "left": {
                                "func": function(){
                                   // console.log(curSelect)
                                }
                            }
                        }
                    });
                }
            }
            $('leftNav').innerHTML = str;
            if (!!callbackFunc) {
                callbackFunc();
                callbackFunc = undefined;
            } else {
                if(!params['isEnter']){
                    if (!key_effect_opt(curID)) key_effect_opt("left_item_0");
                }
                getRightData(true)
            }
            if(curPage==1 && curPage<totalPage){
                $('pageUp').style.display='none';
                $('pageDown').style.display='block';
            }
            if(curPage>1 && curPage<totalPage){
                $('pageUp').style.display='block';
                $('pageDown').style.display='block';
            }
            if(curPage==totalPage &&curPage!=1){
                $('pageUp').style.display='block';
                $('pageDown').style.display='none';
            }
            if(curPage==totalPage && totalPage==1){
                $('pageUp').style.display='none';
                $('pageDown').style.display='none';
            }
        }
    });
}

function leftUp() {
    if (!!callbackFunc) return;
    var curIndex = currentSelectObjectId.split('_')[2] - 0;
    if (curPage == 1) {
        if (curIndex <= 6) {
            key_effect_opt("left_item_" + (curIndex - 1));
        }
    } else {
        if (curIndex == 0) {
            curPage--;
            getLeftNav(function(){
                key_effect_opt("left_item_" + (curIndex + 6));
            });
            /* callbackFunc = function () {
                key_effect_opt("left_item_" + (curIndex + 6));
            } */
        } else {
            key_effect_opt("left_item_" + (curIndex - 1));
        }
    }
}

function leftDown() {
    var curIndex = currentSelectObjectId.split('_')[2] - 0;
    if (curIndex < 6) {
        key_effect_opt("left_item_" + (curIndex+1));
    } else {
        if (curPage < totalPage) {
            curPage++;
            getLeftNav(function () {
                curIndex = 0;
                key_effect_opt("left_item_0");
            });
        }
    }
}

function leftClick() {
    ele(curSelect.id).className('left_item');
    curSelect.id = currentSelectObjectId;
    curSelect.page = curPage;
    ele(curSelect.id).className('select focus left_item');
    rightPage=1;
    $('text_list').style.display='none';
    $('picture_list').style.display='none';
    $('card_list').style.display='none';
    $('tip').style.display='block';
    $('tip').innerHTML='正在获取';
    for(var i=0;i<9;i++){
        $('text_item_'+i)&&($('text_item_'+i).style.display='none');
    }
    for(var i=0;i<12;i++){
        $('card_item_'+i)&&($('card_item_'+i).style.display='none');
        $('pic_item_'+i)&&($('pic_item_'+i).style.display='none');
    }
    if(timeout){
        clearTimeout(timeout);
        timeout=null;
    }
    timeout=setTimeout(function(){
        getRightData();
        clearTimeout(timeout);
    },300)
}

function getRightData(flag){
    document.onkeydown = null;
    var index=curSelect.id.split('_')[2]-0;
    setCookie('leftName',navList[index].CATALOGNAME);
    if(navList[index].ISLEAF==1){
        if(navList[index].CATALOGTYPE==1){
            var listSize=9;
        }else{
            var listSize=12;
        }
        dataGetter.getData(navList[index].CATALOGCODE,rightPage,listSize,function(res){
            if(res.data.length>0){
                allPage=Math.ceil(res.totalSize/ listSize);
                $('tip').style.display='none';
                    if(navList[index].CATALOGTYPE==1){
                        textList(res);
                    }else{
                        picList(res);
                    }
                $('page_button').style.display='block';
               $('page_num').innerHTML=rightPage +' '+'/'+' '+allPage;
               key_Binds();
            }else{
                $('text_list').style.display='none';
                $('picture_list').style.display='none';
                $('tip').style.display='block';
                $('tip').innerHTML='暂无数据';
                $('page_button').style.display='none';
                key_Binds();
            }
            if(flag){
                if (!key_effect_opt(curID)) key_effect_opt("left_item_0");
                if(!!params['isEnter']){
                    ele(curSelect.id).className('select left_item');
                }
            }
        })
    }else{
        $('card_list').style.display='block';
         var listSize=12;
         dataGetter.getCategory(navList[index].CATALOGCODE, rightPage, listSize, getCookie('customerID'),function(res){
            if(res.data.length>0){
                allPage=Math.ceil(res.totalSize/ listSize);
                key_Binds()
                $('tip').style.display='none';
                cardList(res);
                $('page_num').innerHTML=rightPage +' '+'/'+' '+allPage;
            }else{
                $('card_list').style.display='none';
                $('tip').style.display='block';
                $('tip').innerHTML='暂无数据';
                $('page_button').style.display='none';
                key_Binds();
            }
            if(flag){
                if (!key_effect_opt(curID)) key_effect_opt("left_item_0");
                if(!!params['isEnter']){
                    ele(curSelect.id).className('select left_item');
                }
            }
        })
    }
    
}
function textList(res){
    $('text_list').style.display='block';
    $('text_list').innerHTML='';
    for(var i=0,str='';i<res.data.length;i++){
        var timeStamp=res.data[i].createTime.time;
        str+=' <div id="text_item_'+i+'" class="list_item" style="top:'+parseInt(i/3)*165+'px;left:'+parseInt(i%3)*320+'px">'+
                '<img class="text_bg" src="image/list/text_bg.png" alt="">'+
                '<div id="text_inner_'+i+'" class="text_inner">'+res.data[i].description+'</div>'+
                '<div class="text_time"></div>'+
                '<div id="text_time_'+i+'" class="text_time">'+timeTrans(timeStamp)+'</div>'+
                '<img class="focus_img" src="image/list/focus_m.png" alt="">'+
            '</div>';
            elementMap.put('text_item_'+i,{
                "notRecordUrl":true,
                /* "scroll":{"text":res.data[i].description,"id":"text_inner_"+i,"len":40}, */
                "effect":{
                    "blur":{"class":"list_item",'func':scrollTool.removeScroll},
                    "focus":{"class":"list_item focus",'func':scrollTool.startScroll}},
                    "click":{"func":function () {
                        var index=currentSelectObjectId.split('_')[2]-0; 
                        var burl = location.href.split("?")[0];
                        burl+="?categoryID="+categoryCode;
                        burl+="&curID="+currentSelectObjectId;
                        burl+="&curPage="+curSelect.page;
                        burl+="&rightPage="+rightPage;
                        burl+="&leftSelect="+curSelect.id;
                        burl+="&isEnter=true&backurl="+escape(backurl);
                        location.href = goDetail(res.data[index],burl);
                    }},
                "nav":{
                    "down":{"id":"text_item_"+(i+3)+((parseInt(i/3)==parseInt((i+2)/3))?"":",text_item_"+(i+2))+((parseInt(i/3)==parseInt((i+1)/3))?"":",text_item_"+(i+1))+',btn_right'},
                    'up':{"id":"text_item_"+(i-3)},
                    "right":{"id":'text_item_'+(i+1)},
                    "left":{'func':function(){
                        var curIndex=currentSelectObjectId.split('_')[2]-0;
                        key_effect_opt("text_item_" + (curIndex - 1));
                        if(curIndex%3==0){
                            if(curPage!=curSelect.page){
                                curPage = curSelect.page;
                                getLeftNav(function () {
                                    key_effect_opt(curSelect.id);
                                    /* console.log(22222); */
                                });
                            }else{
                                key_effect_opt(curSelect.id);
                                /* console.log(111111); */
                            }
                        }
                    }}
                }
            })
            elementMap.get("btn_right").nav.up={"id":"text_item_"+i};
            elementMap.get("btn_left").nav.up={"id":"text_item_"+i};
    }
    $('text_list').innerHTML=str;
}
function picList(res){
    $('picture_list').innerHTML='';
    $('picture_list').style.display='block';
    for(var i=0,str='';i<res.data.length;i++){
        str+='<div id="pic_item_'+i+'" class="list_item" style="top:'+parseInt(i/4)*166+'px;left:'+parseInt(i%4)*242+'px">'+
                '<img class="item_pic" src="'+res.data[i].smallImageUrl[0].imageUrl+'" alt="">'+
                '<img class="item_mask" src="image/list/pic_mask.png" alt="">'+
                '<div id="pic_name_'+i+'" class="pic_name">'+res.data[i].name+'</div>'+
                '<img class="focus_img" src="image/list/focus_s.png" alt="">'+
            '</div>';
            elementMap.put('pic_item_'+i,{
                "notRecordUrl":true,
                "scroll":{"text":res.data[i].name,"id":"pic_name_"+i,"len":20},
                "effect":{
                    "blur":{"class":"list_item",'func':scrollTool.removeScroll},
                    "focus":{"class":"list_item focus",'func':scrollTool.startScroll}},
                "click":{"func":function () {
                        var index=currentSelectObjectId.split('_')[2]-0; 
                        var burl = location.href.split("?")[0];
                        burl+="?categoryID="+categoryCode;
                        burl+="&curID="+currentSelectObjectId;
                        burl+="&curPage="+curSelect.page;
                        burl+="&rightPage="+rightPage;
                        burl+="&leftSelect="+curSelect.id;
                        burl+="&isEnter=true&backurl="+escape(backurl);
                        location.href = goDetail(res.data[index],burl);
                    }},
                "nav":{
                    "down":{"id":
                    "pic_item_"+(i+4)+((parseInt(i/4)==parseInt((i+3)/4))?"":
                    ",pic_item_"+(i+3))+((parseInt(i/4)==parseInt((i+2)/4))?"":
                    ",pic_item_"+(i+2))+((parseInt(i/4)==parseInt((i+1)/4))?"":
                    ",pic_item_"+(i+1))+",btn_right"},
                    'up':{"id":"pic_item_"+(i-4)},
                    "right":{"id":(i+1)%4==0?"":('pic_item_'+(i+1))},
                    "left":{'func':function(){
                        var curIndex=currentSelectObjectId.split('_')[2]-0;
                        key_effect_opt("pic_item_" + (curIndex - 1));
                        if(curIndex%4==0){
                            if(curPage!=curSelect.page){
                                curPage = curSelect.page;
                                getLeftNav(function () {
                                    key_effect_opt(curSelect.id);
                                });
                            }else{
                                key_effect_opt(curSelect.id);
                            }
                        }
                        
                    }}
                }
            })
            elementMap.get("btn_right").nav.up={"id":"pic_item_"+i};
            elementMap.get("btn_left").nav.up={"id":"pic_item_"+i};
    }
    $('picture_list').innerHTML=str;
}
function cardList(res){
    $('card_list').innerHTML='';
    $('card_list').style.display='block';
    for(var i=0,str='';i<res.data.length;i++){
        str+='<div id="card_item_'+i+'" class="list_item" style="top:'+parseInt(i/4)*166+'px;left:'+parseInt(i%4)*242+'px">'+
                '<img class="card_bg" src="image/list/card_bg.png" alt="">'+
                '<img class="focus_img" src="image//list/focus_s.png" alt="">'+
                '<div id="card_name_'+i+'" class="card_name">'+res.data[i].CATALOGNAME+'</div>'+
            '</div>';
            elementMap.put('card_item_'+i,{
                "notRecordUrl":true,
                "scroll":{"text":res.data[i].CATALOGNAME,"id":"card_name_"+i,"len":20},
                "effect":{
                    "blur":{"class":"list_item",'func':scrollTool.removeScroll},
                    "focus":{"class":"list_item focus",'func':scrollTool.startScroll}},
                "click":{"func":function () {
                        var index=curSelect.id.split('_')[2]-0
                        var i=currentSelectObjectId.split('_')[2]-0
                        var burl = location.href.split("?")[0];
                        burl+="?categoryID="+categoryCode;
                        burl+="&curID="+currentSelectObjectId;
                        burl+="&curPage="+curSelect.page;
                        burl+="&rightPage="+rightPage;
                        burl+="&leftSelect="+curSelect.id;
                        burl+="&isEnter=true&backurl="+escape(backurl);
                        var num=parseInt((rightPage-1)*12+i);
                        var leftPage=(Math.ceil(num/6));
                        if(leftPage==0){
                            leftPage=1;
                        }
                        if(!!getRequest().flag){
                            var url = "list.html?categoryID="+navList[index].CATALOGCODE+"&curPage="+leftPage+"&curSelect=left_item_"+(parseInt(num%7))+"&isFlag=true"+"&backurl="+escape(burl)+"&flag=true";
                        }else{
                            var url = "list.html?categoryID="+navList[index].CATALOGCODE+"&curPage="+leftPage+"&curSelect=left_item_"+(parseInt(num%7))+"&isFlag=true"+"&backurl="+escape(burl);
                        }
                        location.href=url
                    }},
                "nav":{
                    "down":{"id":"card_item_"+(i+4)+((parseInt(i/4)==parseInt((i+3)/4))?"":",card_item_"+(i+3))+((parseInt(i/4)==parseInt((i+2)/4))?"":",card_item_"+(i+2))+((parseInt(i/4)==parseInt((i+1)/4))?"":",card_item_"+(i+1))+',btn_right'},
                    'up':{"id":"card_item_"+(i-4)},
                    "right":{"id":(i+1)%4==0?"":('card_item_'+(i+1))},
                    "left":{'func':function(){
                        var curIndex=currentSelectObjectId.split('_')[2]-0;
                        key_effect_opt("card_item_" + (curIndex - 1));
                        if(curIndex%4==0){
                            if(curPage!=curSelect.page){
                                curPage = curSelect.page;
                                getLeftNav(function () {
                                    key_effect_opt(curSelect.id);
                                });
                            }else{
                                key_effect_opt(curSelect.id);
                            }
                        }
                    }}
                }
            })
        elementMap.get("btn_right").nav.up={"id":"card_item_"+i};
        elementMap.get("btn_left").nav.up={"id":"card_item_"+i};
    }
    $('card_list').innerHTML=str;
}
function btnMove(){
    elementMap.put('btn_right',{
        "notRecordUrl":true,
        "effect":{
            "blur":{"class":"page_btn"},
            "focus":{"class":"page_btn focus"}},
        "click":{"func":function () {
                if(rightPage<allPage){
                    rightPage++;
                    getRightData();
                }
            }},
        "nav":{
            "up":{'id':''},
            "down":{'id':''},
            "right":{"id":''},
            "left":{"id":'btn_left'}
        }
    })
    elementMap.put('btn_left',{
        "notRecordUrl":true,
        "effect":{
            "blur":{"class":"page_btn"},
            "focus":{"class":"page_btn focus"}},
        "click":{"func":function () {
                if(rightPage<=allPage && rightPage!=1){
                    rightPage--;
                    getRightData();
                }
            }},
        "nav":{
            "up":{'id':''},
            "down":{'id':''},
            "right":{"id":'btn_right'},
            "left":{"func":function(){
                if(curPage!=curSelect.page){
                    curPage = curSelect.page;
                    getLeftNav(function () {
                        key_effect_opt(curSelect.id);
                    });
                }else{
                    key_effect_opt(curSelect.id);
                }
            }}
        }
    })
}
function timeTrans(timeStamp) {
    var curTime='';
    var date = new Date(timeStamp);
    Y = date.getFullYear() + '.';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
    D = date.getDate() + ' ';
    curTime=Y+M+D;
    return curTime;
}
function pageNav(){
    if(!!getCookie('clickTitle') && getCookie('clickTitle')!=''){
        $('page_nav').innerHTML='首页'+'/'+getCookie('clickTitle');
    }
}
function gotoBackNavigationUrl() {
    location.href = backurl;
    setCookie('leftName','');
}
window.focus();