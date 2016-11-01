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
    }).state('search', {
        url:'/search',
        views:{
            "":{
                templateUrl:"views/search.html",
                controller:"searchCtrl"
            }
        },
        resolve:{
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/searchCtrl.js');
            }]
        }
    }).state('searchDetail', {
        url:'/searchDetail?:keywords',
        // params: {keywords: null},
        views:{
            "":{
                templateUrl:"views/searchDetail.html",
                controller:"searchDetailCtrl"
            }
        },
        resolve:{
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/searchDetailCtrl.js');
            }]
        }
    }).state('postsNew', {
        url:'/posts/new',
        // params: {keywords: null},
        views:{
            "":{
                templateUrl:"views/posts/new.html",
                controller:"postsNewCtrl"
            }
        },
        resolve:{
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/postsNewCtrl.js');
            }]
        }
    });
     $urlRouterProvider.otherwise('/search');
}]);