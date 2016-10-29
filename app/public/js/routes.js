var routes = angular.module('routes', ['ui.router', "oc.lazyLoad"]);
routes.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('test', {
        url:'/test',
        views:{
            "header":{
                templateUrl:"views/header.html",
                controller:"headerCtrl"
            },
            "":{
                templateUrl:"views/test.html",
                controller:"testCtrl"
                // controllerAs:"testCtrl"
            }
        },
        resolve:{
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/testCtrl.js');
            }]
        }
    });
     $urlRouterProvider.otherwise('/test');
}]);