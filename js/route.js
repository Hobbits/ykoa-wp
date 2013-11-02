app.config(['$routeProvider',function($routeProvider) {
        $routeProvider
            .when("/about", {
                templateUrl: "content/about.html",
                pageTitle:"关于我们",
                pageRole:"n5",
                transition: "fade"
            })
            .when("/newslist", {
                templateUrl: "content/newslist.html",
                pageTitle:"新闻",
                transition: "fade",
                pageRole:'newslist',
                reverse: false
            })
            .when("/newsdetail/:aid", {
                templateUrl: "content/newsDetail.html",
                pageTitle:"新闻详情",
                transition: "iOSlide",
                pageRole:'newsDetail',
                reverse: false
            })
            .when("/service", {
                templateUrl: "content/service.html",
                pageTitle:"服务项目",
                pageRole:"n2",
                transition: "fade"
            })
            .when("/servicedetail/:aid", {
                templateUrl: "content/serviceDetail.html",
                pageTitle:"",
                pageRole:"n2",
                transition: "slide",
                reverse: false
            })
            .when("/case", {
                templateUrl: "content/case.html",
                pageTitle:"成功案例",
                pageRole:"n3",
                transition: "fade"
            })
            .when("/casepic/:id", {
                templateUrl: "content/casePic.html",
                pageTitle:"图片展示",
                pageRole:"n3",
                transition: "slide"
            })
            .when("/jobs", {
                templateUrl: "content/jobs.html",
                pageTitle:"工作在云库",
                pageRole:"n4",
                transition: "fade"
            })
            .when("/", {
                templateUrl: "content/home.html",
                pageRole:"main",
                pageTitle:"云库科技"

            })
            .otherwise({
                redirectTo: "/"
            });
    }]);

