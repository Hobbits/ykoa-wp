app.controller("newslistCtrl",['$scope','newsList','$sessionStorage',function($scope,newsList,$sessionStorage){

    $scope.loadmore={
        act:function(){
            queryAct($scope.catChosen,$scope.loadmore.curPage[$scope.catChosen]+1);
        },
        curPage:[null,0,0],
        isloading:false,
        limit:5,/*每页多少*/
        standbyText:'点击载入更多'
    }

    var queryAct=function(v,pageNum){
        newsList.query({catId:v,pageNum:pageNum,limit:$scope.loadmore.limit},function(u){
            var arrange=function(list,monthKey){
                var arrangedList=[];
                for(var i in list){
                    if(list[i][monthKey]){
                        var curmkey=list[i][monthKey];
                        if(("m_"+curmkey) in arrangedList){
                            arrangedList["m_"+curmkey]['arr'].push(list[i]);
                        }else{
                            arrangedList["m_"+curmkey]={
                                monthNote:curmkey,
                                arr:[list[i]]
                            };
                        }

                    }
                };
                var result=[]
                for(g in arrangedList){
                    result.push(arrangedList[g])
                }
                if(angular.isArray(u) && u.length>=$scope.loadmore.limit){
                    $scope.loadmore.curPage[v]=pageNum;
                    $scope.loadmore.isloading=false;
                    $scope.loadmore.standbyText="点击载入更多";
                }else{
                    $scope.loadmore.isloading=false;
                    $scope.loadmore.standbyText="没有更多了";
                }

                return result;
            }
            if($scope['newsList'+v]){
                $scope['newsList'+v]=$scope['newsList'+v].concat(arrange(u,'m'));
            }else{
                $scope['newsList'+v]=arrange(u,'m');
            }


        });
    }


    $scope.$watch('catChosen', function(v) {

        $scope.loadmore.isloading=true;
        $scope.loadmore.standbyText="载入中";
        queryAct(v,$scope.loadmore.curPage[v]+1);
        $sessionStorage.newslistCat=v;
    });


    if($sessionStorage.newslistCat){
        $scope.catChosen=$sessionStorage.newslistCat;
    }else{
        $scope.catChosen=1;
    }

}])