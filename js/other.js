/*主页样式*/
(function(window){
    var content=document.body;
    var TRANSFORM="webkitTransform" in document.documentElement.style ? "-webkit-transform" : "transform";
    var cssBowl=document.getElementById('homeStyle');
    var setDeg=function(){
        var width=content.offsetWidth;
        var height=content.offsetHeight;
        var rotationVal=Math.atan(width/height);
        var newDeg=rotationVal/0.017453293;
        var c=width/Math.sin(rotationVal);
        var nagMar=(c/2)*-1;
        var cardWrapCss='height:'+c+'px;'+'width:'+c+'px;'
        +'margin-left:'+nagMar+'px;'
        +'margin-top:'+nagMar+'px;'
        +'top:50%;left:50%;'
        +TRANSFORM+':'+'rotate('+newDeg+'deg);';
        cardWrapCss='#cardWrap{'+cardWrapCss+'}';

        var roStringGen=function(cssrole,deg){
            var cssString=cssrole+'{-webkit-transform:'+'rotate('+deg+'deg)'+'}';
            cssString+=cssrole+'{transform:'+'rotate('+deg+'deg)'+'}';
            return cssString;
        };
        var iconmaxHeight='';
        if(TRANSFORM!='-webkit-transform'){
            /*Fix none webkit browsers*/
            iconmaxHeight='.cardIcon{max-height:'+c/5*0.4+'px}';
        }
        var fixRotString = roStringGen('.cardIcon',newDeg*-1)+roStringGen('.cardTitle',newDeg*-1)+iconmaxHeight;
        cssBowl.innerHTML=cardWrapCss+fixRotString;

    };
    window.addEventListener('resize',setDeg);
    setDeg();

}(window));
/*主页样式结束*/


$('body').on('click',"[href]",function(event){
    event.preventDefault();
    var url=$(this).attr('href');
    if(url.indexOf("http") >= 0){
        window.open(url, '_blank', 'location=yes');
    }
    });


app.run(['$route', '$http', '$templateCache',function($route, $http, $templateCache) {
    angular.forEach($route.routes, function(r) {
        if (r.templateUrl) {
            $http.get(r.templateUrl, {cache: $templateCache});
        }
    });
}]);

/*手动关闭启动画面*/
document.addEventListener("deviceready", function(){
    setTimeout(function(){navigator.splashscreen.hide();},500);
}, false);
