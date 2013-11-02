/*启动angular*/
var app=angular.module('guoqing2013.yunkooApp', ['ngRoute','ngAnimate','ngResource','ngStorage','ngSanitize','ajoslin.mobile-navigate','hmTouchEvents']);


app.config(['$httpProvider',function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);

app.controller('MainCtrl', ['$scope', '$navigate',function($scope, $navigate) {
    $scope.$navigate = $navigate;

    var timmer={
        delay:1800,
        date:null,
        timeoutId:null
    };

    var act={
        open: function (delay) {
            if(typeof(delay)!=='undefined'){
                timmer.delay=delay;
            }

            timmer.date=new Date();
            if(timmer.timeoutId){clearTimeout(timmer.timeoutId);}

            timmer.timeoutId=setTimeout(function(){
                    $scope.$apply(function(){$scope.loading = true;});
            },timmer.delay);
        },
        close: function () {

              if(timmer.timeoutId){
                  var cDate=new Date();
                  if(timmer.date && (cDate-timmer.date)<=timmer.delay && timmer.timeoutId){
                      clearTimeout(timmer.timeoutId);
                  }
                  $scope.loading = false;
              }

            timmer.timeoutId=null;
        }
    };


    $scope.$on('LOAD', function() {act.open();}
    );
    $scope.$on('UNLOAD', function() {act.close();});
}]);

/*导航动画
* 用法：添加"nav-to"属性 "ani"属性（动画）ani属性值前加符号为反向
* */
app.directive("navTo",['$navigate', function($navigate){
    return {
        restrict: 'A',
        link: function (scope,element,attrs) {

            var tapAct=function(){
                var path=attrs['navTo'];
                var animate=attrs.ani;
                if(path=='back'){
                    scope.$apply(function(){$navigate.back()});
                }else{
                    if(animate && animate.substr(0, 1) == "-"){
                        animate=animate.substr(1);
                        scope.$apply(function(){$navigate.go(path,animate,true)});
                    }else{
                        scope.$apply(function(){$navigate.go(path,animate)});
                    }

                };
            };

            if(attrs['ebind']){
                if(isTouchDevice){
                    element.bind(attrs['ebind'],tapAct);
                }else{
                    element.bind('click',tapAct);
                }

            }else{
                if(window.navigator.msPointerEnabled){
                    element.bind("click",tapAct);
                }else{
                    Hammer(element[0]).on("tap",tapAct);
                }
            }




        }
    }
}]);


app.directive("touchact",function(){
    return {
        restrict: 'A',
        link: function (scope,element,attrs) {
            if(!('add' in document.body.classList)){return;}
            var classname=attrs['touchact'] || 'navfocus';
            element.bind("touchstart",function(){
                var cl=this.classList;
                cl.add(classname);
                setTimeout(function(){cl.remove(classname)},300);
            });
            element.bind("touchend",function(){
                this.classList.remove(classname);
            })
        }
    }
});


