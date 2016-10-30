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

        }


    }]);