app.controller("serviceDetailCtrl",['$scope','AJAX','$routeParams','headerChanger','noticeInfo',function($scope,AJAX,$routeParams,headerChanger,noticeInfo){
    var aid = $routeParams.aid;
    $scope.IMAGE_ROOT = IMAGE_ROOT;
    var ajax1 = AJAX({
        url: APP_ACTION.SERVICE_DETAIL + aid,
        cache: true,
        bCall: function () {
            $scope.$emit('LOAD');
        },
        sCall: function (data) {
            console.log(data);
            if(data.status == "ok") {
                headerChanger.send({pageTitle: data.remark});
                $scope.serviceDetail = data.result;
            }
        },
        cCall: function () {
            $scope.$emit('UNLOAD');
        },
        eCall:function(){
            noticeInfo.show({message: '信息获取失败！'});
        }
    });

    $scope.$on('$destroy',function(){
        if(ajax1){ajax1.resolve();}
    });


}]);