app.controller("newsDetailCtrl",['$scope','$routeParams','$resource',function($scope,$routeParams,$resource){
        var aid=$routeParams['aid'];
        var newsDt=$resource(APP_ACTION['NEWSDETAIL']+':aid',
            {'aid':aid});

    $scope.detail={};
        $scope.detail=newsDt.get(function(data){
            if(data.content){
                $scope.detail.content=data.content;
            }
            if(data.picture){
                $scope.detail.picture=IMAGE_ROOT+data.picture;
            };



        },function(error){
            $scope.detail.title=":( 数据传输错误";
        });


    $scope.newBro=function(url){
        window.open(url, '_blank', 'location=yes');
    }



}])