/**
 * Created by CYT on 2018/5/15.
 */
var dataGetter = {
    HOST:"http://192.168.2.40:8080/NXOpenAPI",
    jsonp:function(url,success,error){
        var flag = false;
        var call = "p"+new Date().getTime()+Math.round(Math.random()*100);
        url+="&callback="+call;
        window[ call ] = function( tmp ) {
            flag = true;
            if(success)success(tmp);
            window[ call ] = undefined;

            try { delete window[ call ]; } catch(e) {}

            if ( head ) { head.removeChild( script ); }
        };

        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        var script = document.createElement("script");
        script.src = url;
        head.insertBefore( script, head.firstChild );
        if(error){
            window[ call+"_err" ] = function(){
                if(!flag && error)error();

                window[ call+"_err" ] = undefined;
                try { delete window[ call+"_err" ]; } catch(e) {}

                window[ call ] = undefined;
                try { delete window[ call ]; } catch(e) {}

                if ( head ) { head.removeChild( script ); }
            };
            setTimeout("if("+call+"_err)"+call+"_err();",5000);
        }

        return window[ call ];
    },
     //获取海报logo数据
     getPic:function (customerid,success,error){

        var url = dataGetter.HOST+"/customer/customerQuery.do?customerid="+customerid;

        dataGetter.jsonp(url,success,error);
    },
     //获取子栏目内容
    getData:function(code,page,size,success,error){
        if(window.location.href.indexOf('flag')>-1){
            var url = dataGetter.HOST+"/content/resourceQuery.do?flag=true&catalogCode="+code+"&pageNo="+page+"&pageSize="+size;
        }else{
            var url = dataGetter.HOST+"/content/resourceQuery.do?catalogCode="+code+"&pageNo="+page+"&pageSize="+size;
        }
        dataGetter.jsonp(url,success,error);
        /*http://218.95.171.22:8081/NXOpenAPI/content/resourceQuery.do?catalogCode=00107201805171742517&pageNo=0&pageSize=1;*/
    },
    //获取详情数据
    getDetail:function (catalogCode,contentID,page,size,success,error){
        if(window.location.href.indexOf('flag')>-1){
            var url = dataGetter.HOST+"/content/resourceQuery.do?flag=true&catalogCode="+catalogCode+"&contentID="+contentID+"&pageNo="+page+"&pageSize="+size;
        }else{
            var url = dataGetter.HOST+"/content/resourceQuery.do?catalogCode="+catalogCode+"&contentID="+contentID+"&pageNo="+page+"&pageSize="+size;
        }
        dataGetter.jsonp(url,success,error);
    },
     //获取首页栏目
    getCategory:function (code,page,size,customerID,success,error){
        if(window.location.href.indexOf('flag')>-1){
            var url = dataGetter.HOST+"/category/categoryQuery.do?flag=true&parencode="+code+"&pageNo="+page+"&pageSize="+size+"&customerid="+customerID;
        }else{
            var url = dataGetter.HOST+"/category/categoryQuery.do?parencode="+code+"&pageNo="+page+"&pageSize="+size+"&customerid="+customerID;
        }
        //var url='http://218.95.171.22:8081/NXOpenAPI/category/categoryQuery.do?parencode=004&&customerid=004&&pageNo=0&&pageSize=100'
        dataGetter.jsonp(url,success,error);
    },

    //获取天气预报
    getWeather:function(iptvaccount,success,error){
        var url=dataGetter.HOST+"/weather/weatherQuery.do?iptvaccount="+iptvaccount;
        dataGetter.jsonp(url,success,error);
    },

    //测试获取手机的
    getPhone:function(name,succsee,error){
        var url = "https://suggest.taobao.com/sug?code=utf-8&q="+name;
         dataGetter.jsonp(url,succsee,error);
    },

    getNews:function(name,succsee,error){
        var url ="http://3g.163.com/touch/jsonp/sy/recommend/0-9.html?miss=48&refresh=B02callback=syrec4";
        dataGetter.jsonp(url,succsee,error);
    }
};