app.controller("aboutCtrl",['$scope','AJAX','$resource','noticeInfo',function($scope,AJAX,$resource,noticeInfo){
    $scope.company = {}
    $scope.IMAGE_ROOT = IMAGE_ROOT;
    var actions =  {
        read: {method: 'GET', cache:true }
    };
    var companyInfo = $resource(APP_ACTION.ABOUTUS, {}, actions);
    $scope.$emit('LOAD');
    companyInfo.read(function(data){
        if(data.status == 'ok') {
            var d = data.result;
            $scope.company.company_logo = d.logo;
            $scope.company.company_info = d.company_info;
            $scope.company.company_tel = d.company_tel;
            $scope.company.company_qq = d.company_qq;
            $scope.company.company_net = d.company_net;
            $scope.company.company_email = d.company_email;
        }
        $scope.$emit('UNLOAD');
    }, function(error){
        noticeInfo.show();
        $scope.$emit('UNLOAD');
    });
}]);