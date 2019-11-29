/**
 * Created by CYT on 2018/8/15.
 */
var params = getRequest();
var backurl = params["backurl"] ||"index.html";
var curID='btn_right';
var pageNo=1;
var pageSize=1;
var catalogCode=params["categoryID"];
var contentID=params["contentID"];
var curPic=0;
var customerID = getCookie('customerID') || '004';
var allPage=1;
function init() {
    key_Binds();
    getPic();
    setInterval(initTime(), 60000);
    pageNav();
    dataGetter.getDetail(catalogCode,contentID,pageNo,pageSize,function (data) {
        console.log(data.data)
        var res=data.data;
        if(res.length>0){
            for(var i=0;i<res.length;i++){
                if(res[i].contentImageUrl.length>0){
                    allPage=res[i].contentImageUrl.length;
                    if(res[i].contentImageUrl.length>1){
                        var imgs=res[i].contentImageUrl;
                        btnMove(imgs);
                    }else{
                        var imgs=res[i].contentImageUrl;
                        btnMove(imgs);
                    }
                    $('page_button').style.display='block';
                    $('page_num').innerHTML=(curPic+1) +' '+'/'+' '+allPage;
                }else{
                    $('page_button').style.display='none';
                    $('picture_box').innerHTML='<div id="tip">暂无图片</div>';
                }
            }
            var str=res[0].name;
            if(getStrRealLen(str)>14){
                $('logo_title').innerHTML='<marquee>'+str+'</marquee>';
            }else{
                $('logo_title').innerHTML=str;
            }
        }
        if (!key_effect_opt(curID)) key_effect_opt("btn_right");
    })
    
}

function btnMove(imgs){
    $('picture').src=imgs[curPic].imageUrl;
    elementMap.put('btn_right',{
        "notRecordUrl":true,
        "effect":{
            "blur":{"class":"page_btn"},
            "focus":{"class":"page_btn focus"}},
        "click":{"func":function () {
                    curPic++;
                    if(curPic>=imgs.length){
                        curPic=0;
                    }
                $('picture').src=imgs[curPic].imageUrl;
                $('page_num').innerHTML=(curPic+1) +' '+'/'+' '+allPage;
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
                curPic--;
                if(curPic<0){
                    curPic=imgs.length-1
                }
            $('picture').src=imgs[curPic].imageUrl;
            $('page_num').innerHTML=(curPic+1) +' '+'/'+' '+allPage;
            }},
        "nav":{
            "up":{'id':''},
            "down":{'id':''},
            "right":{"id":'btn_right'},
            "left":{"id":''}
        }
    })
}
function getPic() {
    dataGetter.getPic(customerID, function (data) {
        if (data.data != null) {
            if (!!data.data.cusbackimage || !!data.data.cuslogo) {
                $('bgImg').src = data.data.cusbackimage;
            }
        }
    })
}
function pageNav(){
    if(!!getCookie('clickTitle') && getCookie('clickTitle')!='' &&!!getCookie('leftName') && getCookie('leftName')!=''){
        $('page_nav').innerHTML='首页'+'/'+getCookie('clickTitle')+'/'+getCookie('leftName');
    }else{
        $('page_nav').innerHTML='首页'+'/'+getCookie('clickTitle');
    }
}
function gotoBackNavigationUrl(){
    location.href = backurl;
}
window.focus();