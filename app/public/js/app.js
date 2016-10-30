var app = angular.module('myApp', ['routes', 'services', 'angular-loading-bar', 'filters', 'directives', 'ngSanitize'])
    .config(['$ocLazyLoadProvider', '$httpProvider', 'cfpLoadingBarProvider', function ($ocLazyLoadProvider, $httpProvider, cfpLoadingBarProvider) {
        // 懒加载相关设置
        $ocLazyLoadProvider.config({
            debug: false,
            events: false
            // modules: [{
            //     name: 'directives',
            //     files: ['modules/directives.js']
            // },{
            //     name: 'filters',
            //     files: ['js/modules/filters.js']
            // }]
        });

        // loadingBar 相关设置
        // 是否显示loading（默认为true）
        cfpLoadingBarProvider.includeSpinner = false;

    }]);
app.run(['$rootScope', '$state', 'httpBase', function ($rootScope, $state ,httpBase) {
    $rootScope._http = httpBase;
    $rootScope._state = $state;

    $rootScope.user = {};
    httpBase.get({
        url: '/api/v1/user/info',
        alwaysDo: function (isErr, data) {
            if (!isErr){
                $rootScope.user = data.user;
            }
            console.log(isErr, data);
        }
    })

}]);

app.controller('headerCtrl', ['$scope', function ($scope) {

}]);