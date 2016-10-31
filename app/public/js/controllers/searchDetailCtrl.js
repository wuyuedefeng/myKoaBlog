angular.module('myApp', [[
    '../css/searchDetail.css'
]])
    .controller('searchDetailCtrl',['$scope', '$stateParams', function($scope, $stateParams) {
        $scope.searchDetail = {
            keywords: $stateParams.keywords
        };
        $scope._http.get({
            url: '/api/v1/posts',
            params: {
                keywords: $scope.searchDetail.keywords
            },
            alwaysDo: function (isErr, data) {
                console.log(isErr, data);
            }
        });

        $scope.search = function () {
            if($scope.searchDetail.keywords){
                $scope._state.go('searchDetail', {keywords: $scope.searchDetail.keywords});
            }else {
                $scope._state.go('search');
            }
        };

        $scope.login = function () {
            if($scope.user.name || $scope.user.username) {
                $scope._http.post({
                    url: 'api/v1/user/logout',
                    alwaysDo: function (isErr, data) {
                        if(!isErr){
                            location.reload();
                        }
                    }
                });
                return;
            }
            $scope._http.get({
                url: '/api/v1/user/githubClientId',
                alwaysDo: function (isErr, data) {
                    location.href = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=' + data.oauthClientId;
                }
            });
        }
    }]);