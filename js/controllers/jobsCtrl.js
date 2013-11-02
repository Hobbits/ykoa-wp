app.controller("jobsCtrl",['$scope','AJAX','$sce',function($scope,AJAX,$sce){
    var ajax1 = AJAX({
        url: APP_ACTION['JOB'],
        cache: true,
        bCall: function () {
            $scope.$emit('LOAD');
        },
        sCall: function (data) {
            try{
                $scope.html=$sce.trustAsHtml(data);
            }catch(e){
                $scope.html=":( 数据传输出错了";
            }

        },
        cCall: function () {
            $scope.$emit('UNLOAD');
        },
        eCall:function(){
            $scope.html=":( 数据传输出错了";
        }
    });

    $scope.$on('$destroy',function(){
        ajax1.resolve();
    });

}]);