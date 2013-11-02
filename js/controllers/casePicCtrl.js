app.controller("casePicCtrl",['$scope','AJAX','$routeParams','$timeout','noticeInfo',function($scope,AJAX,$routeParams,$timeout,noticeInfo){
    var ajax1 = {};
    var scope=this;

    $scope.$on('$pageNaved',(function(){
        var naved=false;
        return function(){
            if(naved) {return};
            naved=true;

            ajax1 = AJAX({
                url: APP_ACTION.CASEIMG + $routeParams.id,
                cache: true,
                sCall: function (data) {
                    if(data.status == "ok") {
                        var picArr = data.result;
                        var newPicArr = picArr.map(function(ele){
                            return IMAGE_ROOT + ele;
                        });
                        $scope.pictures = newPicArr;
                        $scope.caseDescription = data.remark;

                        $timeout(function(){
                            scope.deck = new CardView('#wrapper', {
                                effect: 'slide',
                                direction: 'h'
                            });
                        }, 500);

                    }else{
                        noticeInfo.show();
                    }
                },
                eCall: function(){
                    noticeInfo.show();
                }
            });
            console.log('ajax1',ajax1);

            document.getElementById("morePic").addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        };

    })());


    $scope.$on('$destroy',function(){
        $('#morePic').trigger('die');
        if(ajax1){ajax1.resolve();}
        if(scope.deck){delete scope.deck;}
        if(CardView){delete CardView;}
    });

}]);