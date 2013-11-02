app.controller("serviceCtrl",['$scope','AJAX','noticeInfo',function($scope,AJAX,noticeInfo){
    $scope.IMAGE_ROOT = IMAGE_ROOT;
    var ajax1 = AJAX({
        url: APP_ACTION.SERVICE,
        cache: true,
        bCall: function () {
            $scope.$emit('LOAD');
        },
        sCall: function (data) {
            console.log(data);
            if(data.status == "ok" && !angular.equals([], data.result)) {
                $scope.services = data.result;
            }
        },
        cCall: function () {
            $scope.$emit('UNLOAD');
        },
        eCall:function(){
            noticeInfo.show({message: '获取信息列表失败！'});
        }
    });

    $scope.$on('$destroy',function(){
        ajax1.resolve();
    });
}]);