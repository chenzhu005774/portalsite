var params = getRequest();
var backurl = params["backurl"] ||"index.html";
var curID='btn_right';
var pageNo=0;
var curPage=0;
var curPic=-1;
var pageSize=1;
var catalogCode=params["categoryID"];
var contentID=params["contentID"];
var customerID = getCookie('customerID') || '004';
var step=429;
function init() {
    key_Binds();
    getPic();
    pageNav();
    setInterval(initTime(), 60000);
    dataGetter.getDetail(catalogCode,contentID,pageNo,pageSize,function (data) {
        var res=data.data;
        console.log(res)
        if(res.length>0){
            var str=res[0].name;
            if(getStrRealLen(str)>14){
                document.getElementsByClassName('logo_title')[0].innerHTML='<marquee>'+str+'</marquee>';
            }else{
                document.getElementsByClassName('logo_title')[0].innerHTML=str;
            }
            timeTrans(res[0].createTime.time);
            var heziType;
            var htmlStr; 
            if(typeof Authentication != "undefined"){
                heziType =  Authentication.CTCGetConfig("STBType")
            }
            if(res[0].contentImageUrl.length>0){
                //图文
                if(typeof Authentication != "undefined" && heziType.indexOf("B860AV1.1") >= 0){
                    htmlStr = res[0].content.replace(/<p>/g,"<p style='background: rgba(232,86,62,.1)'>");
                }else{
                    htmlStr = res[0].content;
                }
                $('txt_box').style.display='block';
                $('txt_inner').innerHTML=htmlStr;
                var allP= document.getElementsByTagName("p");
                for(var i=0;i<allP.length;i++){
                    allP[i].innerHTML=allP[i].innerHTML.replace('<br>','')
                }
                var imgs=res[0].contentImageUrl;
                for(var i=0,dots='';i<imgs.length;i++){
                    dots+='<span id="dots_'+i+'" class="dots_item" style="left:'+(i*30)+'px">' +
                                '<img class="circle" src="image/detail/dot.png" alt="">' +
                                '<img class="circle_focus" src="image/detail/dot_focus.png" alt="">' +
                            '</span>';
                }
                $('dots').innerHTML=dots;
                changeImg(imgs);
                scrollText('txt_inner');
            }else{
                step=430;
                // B860AV1.1中兴系列盒子       "B860AV1.1-T2"  中兴t2盒子
               /*  if(typeof Authentication != "undefined" && heziType.indexOf("B860AV1.1") >= 0){
                    htmlStr = res[0].content.replace(/<p>/g,"<p style='background: rgba(232,86,62,.1)'>");
                }else{
                    htmlStr = res[0].content;
                } */
                htmlStr = res[0].content;
                $('article_module').style.display='block';
                $('article_inner').innerHTML=htmlStr;
                var allP= document.getElementById("article_inner").getElementsByTagName("p");
                
                for(var i=0;i<allP.length;i++){
                    allP[i].innerHTML=allP[i].innerHTML.replace('<br>','');
                }
                scrollText('article_inner');
            }
            if (!key_effect_opt(curID)) key_effect_opt("btn_right");
        }
    })
}
function changeImg(imgs) {
    if(curPic!=-1)$("dots_"+curPic).className="dots_item";
    curPic++;
    if(curPic>=imgs.length){
        curPic=0;
    }
    $('pic').src=imgs[curPic].imageUrl;
    $("dots_"+curPic).className="dots_item active";
    window.setTimeout(function () {
        changeImg(imgs);
    },1500);
}
function scrollText(ele) {
    var articleH=$(ele).offsetHeight;
    var totalPage= Math.ceil(articleH/step) || 1;
    elementMap.put('btn_right',{
        "notRecordUrl":true,
        "effect":{
            "blur":{"class":"page_btn"},
            "focus":{"class":"page_btn focus"}},
        "click":{"func":function () {
                if(curPage>=totalPage-1)return;
                curPage++;
                $(ele).style.top=(-(curPage)*step)+'px';
                $('page_num').innerHTML=(curPage+1)+'/'+totalPage;
                //document.getElementsByClassName('page_box')[0].innerHTML='第'+(curPage+1)+'页'+'/'+'共'+totalPage+'页';
            }},
        "nav":{
            "up":{'id':''},
            "down":{'id':''},
            "right":{"id":''},
            "left":{"id":'btn_left'}
        }
    });
    elementMap.put('btn_left',{
        "notRecordUrl":true,
        "effect":{
            "blur":{"class":"page_btn"},
            "focus":{"class":"page_btn focus"}},
        "click":{"func":function () {
                if(curPage<=0)return;
                curPage--;
                $(ele).style.top=(-(curPage)*step)+'px';
                $('page_num').innerHTML=(curPage+1)+'/'+totalPage;
            }},
        "nav":{
            "up":{'id':''},
            "down":{'id':''},
            "right":{"id":'btn_right'},
            "left":{"id":''}
        }
    })
    /* key_down_event=function () {
        if(curPage>=totalPage-1)return;
        curPage++;
        $(ele).style.top=(-(curPage)*step)+'px';
        document.getElementsByClassName('page_box')[0].innerHTML='第'+(curPage+1)+'页'+'/'+'共'+totalPage+'页';
    }; */
   /*  key_up_event=function () {
        if(curPage<=0)return;
        curPage--;
        $(ele).style.top=(-(curPage)*step)+'px';
        document.getElementsByClassName('page_box')[0].innerHTML='第'+(curPage+1)+'页'+'/'+'共'+totalPage+'页';
    }; */
    $('page_num').innerHTML=(curPage+1)+'/'+totalPage;
}
function timeTrans(msg) {
    var date = new Date(msg);
    Y = date.getFullYear() + '.';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
    D = date.getDate() + ' ';
    h =date.getHours()+':';
    m =date.getMinutes();
    $('publish_time').innerText=Y+M+D;
    $('article_time').innerText=Y+M+D;
}
function gotoBackNavigationUrl(){
    location.href = backurl;
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
window.focus();