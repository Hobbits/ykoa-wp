app.controller("caseCtrl",['$scope','AJAX','$routeParams','headerChanger','noticeInfo',function($scope,AJAX,$routeParams,headerChanger,noticeInfo){
    $scope.IMAGE_ROOT = IMAGE_ROOT;
    var ajax1 = AJAX({
        url: APP_ACTION.CASE,
        cache: true,
        sCall: function (data) {
            if(data.status == "ok" && !angular.equals([], data.result)) {
                $scope.caseCategories = data.result;
                $scope.changeCaseCategory(data.result[0]);
            }else{
                noticeInfo.show();
            }
        },
        eCall: function() {
            noticeInfo.show();
        }
    });


    $scope.changeCaseCategory = function(caseCategory) {
        $scope.caseCategoryName = caseCategory.name;
        $(".dropdown-menu").hide();

       var ajax2 = AJAX({
        url: APP_ACTION.CASELIST + caseCategory.id,
            cache: true,
            bCall: function() {
                $scope.$emit('LOAD');
            },
            sCall: function (data) {
                if(data.status == "ok") {
                    $scope.cases = data.result;
                }
            },
            cCall: function(){
                $scope.$emit('UNLOAD');
            },
            eCall: function(){
                noticeInfo.show();
            }
        });
    }

    $scope.toggleDropdownMenu = function() {
        $(".dropdown-menu").toggle();
    }

    $scope.$on('$destroy',function(){
        if(ajax1){ajax1.resolve();}
    });

}]);